import { world } from '../main';

// Combat state
const combat = {
  state: 'off', // off, active, paused
  // Combat variables
  init: 0,
  ap: 0,
  turn: 0,
  // Targets
  targets: [],
  // Selected target
  selectedTarget: null,
  // Combat actions
  actions: [],
  // Combat flags
  flags: {}
};

// Combat math
const combatMath = {
  // Initiative
  initiative(player: any) {
    return 10 + Math.floor((player.stats.Ingenuity + player.stats.Vigor) / 2) + Math.floor(Math.random() * 10) + 1;
  },
  // AP
  ap(player: any) {
    return 4 + Math.floor(player.stats.Resolve / 2);
  },
  // To-hit
  toHit(player: any, weapon: any, target: any) {
    return 50 + (player.skills[weapon.skill] || 0) / 2 + weapon.accuracy + (target.cover ? -10 : 0) + (target.distance ? -20 : 0) + Math.floor(Math.random() * 20) + 1;
  },
  // Crit
  crit(player: any, weapon: any, target: any) {
    return 20;
  }
};

// Combat UI
const combatUI = {
  // Combat elements
  elements: {
    combatPanel: document.getElementById('combat-panel') as HTMLDivElement,
    combatContent: document.getElementById('combat-content') as HTMLDivElement,
    combatTargets: document.getElementById('combat-targets') as HTMLDivElement,
    combatAct: document.getElementById('combat-act') as HTMLButtonElement
  },
  // Show combat
  show(content: string, targets: Array<{id: string, name: string, hp: number}>) {
    combat.state = 'active';
    combatUI.elements.combatPanel?.classList.remove('hidden');
    combatUI.elements.combatContent?.innerHTML = content;
    
    // Clear targets
    combatUI.elements.combatTargets?.innerHTML = '';
    
    // Add targets
    targets.forEach(target => {
      const targetBtn = document.createElement('button');
      targetBtn.textContent = `${target.name} (${target.hp} HP)`;
      targetBtn.classList.add('bg-red-700', 'text-white', 'px-4', 'py-2', 'rounded');
      targetBtn.addEventListener('click', () => {
        // Handle target selection
        selectCombatTarget(target);
      });
      combatUI.elements.combatTargets?.appendChild(targetBtn);
    });
  },
  // Close combat
  close() {
    combat.state = 'off';
    combatUI.elements.combatPanel?.classList.add('hidden');
  },
  // Show error
  showError(message: string) {
    combatUI.elements.combatPanel?.classList.remove('hidden');
    combatUI.elements.combatContent?.innerHTML = message;
  }
};

// Select combat target
function selectCombatTarget(target: {id: string, name: string, hp: number}) {
  combat.selectedTarget = target;
  combatUI.show('Choose action for ' + target.name + '?', []);
  
  // Add action buttons
  const actionBtn = document.createElement('button');
  actionBtn.textContent = 'Attack';
  actionBtn.classList.add('bg-red-700', 'text-white', 'px-4', 'py-2', 'rounded');
  actionBtn.addEventListener('click', () => {
    // Handle attack
    attack(target);
  });
  combatUI.elements.combatTargets?.appendChild(actionBtn);
}

// Attack
function attack(target: any) {
  // Check if player has enough AP
  if (combat.ap <= 0) {
    combatUI.showError('Not enough AP to attack');
    return;
  }
  
  // Calculate to-hit
  const toHit = combatMath.toHit(world.player, world.player.weapon, target);
  
  // Check if attack hits
  if (toHit >= 20) {
    // Hit
    const damage = world.player.weapon.damage + Math.floor(Math.random() * world.player.weapon.damage);
    
    // Apply damage
    target.hp -= damage;
    
    // Check if target dies
    if (target.hp <= 0) {
      // Target dies
      target.hp = 0;
      // Add loot
      addLoot(target);
      // End turn
      endTurn();
    } else {
      // End turn
      endTurn();
    }
  } else {
    // Miss
    combatUI.showError('Missed!');
    // End turn
    endTurn();
  }
}

// Add loot
function addLoot(target: any) {
  // Add loot
  const loot = target.loot;
  if (loot) {
    // Add to inventory
    for (const item of loot) {
      world.player.inv.push(item);
    }
  }
}

// End turn
function endTurn() {
  // Decrement AP
  combat.ap -= 1;
  
  // Increment turn
  combat.turn += 1;
  
  // Check if player can act
  if (combat.ap <= 0) {
    // End combat
    endCombat();
  }
}

// End combat
function endCombat() {
  // Set combat state to off
  combat.state = 'off';
  
  // Hide combat panel
  combatUI.elements.combatPanel?.classList.add('hidden');
}

// Start combat
function startCombat(targets: any[]) {
  // Set combat state to active
  combat.state = 'active';
  
  // Initialize combat variables
  combat.init = combatMath.initiative(world.player);
  combat.ap = combatMath.ap(world.player);
  combat.turn = 0;
  
  // Update targets
  combat.targets = targets;
  
  // Update combat UI
  combatUI.show('Combat started!', targets);
}

// Update combat
function updateCombat() {
  // Check if combat is active
  if (combat.state === 'active') {
    // Check if combat is over
    if (combat.targets.length === 0) {
      // End combat
      endCombat();
    }
  }
}

// Initialize combat
export function createCombatSystem() {
  // Update combat
  function gameLoop() {
    updateCombat();
    requestAnimationFrame(gameLoop);
  }
  
  // Start game loop
  gameLoop();
  
  return combat;
}

// Global combat system
export const combatSystem = createCombatSystem();