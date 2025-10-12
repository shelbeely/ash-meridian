import { world } from '../main';
import { saveSystem } from '../engine/save';

// Global HUD elements
const hud = {
  // Game state
  state: 'main', // main, dialogue, combat, paused
  // UI elements
  elements: {
    pauseButton: document.getElementById('pause-button') as HTMLButtonElement,
    resumeButton: document.getElementById('resume-button') as HTMLButtonElement,
    saveButton: document.getElementById('save-button') as HTMLButtonElement,
    loadButton: document.getElementById('load-button') as HTMLButtonElement,
    optionsButton: document.getElementById('options-button') as HTMLButtonElement,
    // Dialogue
    dialoguePanel: document.getElementById('dialogue-panel') as HTMLDivElement,
    dialogueContent: document.getElementById('dialogue-content') as HTMLDivElement,
    dialogueOptions: document.getElementById('dialogue-options') as HTMLDivElement,
    // Combat
    combatPanel: document.getElementById('combat-panel') as HTMLDivElement,
    combatContent: document.getElementById('combat-content') as HTMLDivElement,
    combatTargets: document.getElementById('combat-targets') as HTMLDivElement,
    combatAct: document.getElementById('combat-act') as HTMLButtonElement,
    // Pause
    pauseScreen: document.getElementById('pause-screen') as HTMLDivElement,
    // Loading
    loadingScreen: document.getElementById('loading-screen') as HTMLDivElement,
    // Error
    errorScreen: document.getElementById('error-screen') as HTMLDivElement,
    errorMessage: document.getElementById('error-message') as HTMLDivElement,
    retryButton: document.getElementById('retry-button') as HTMLButtonElement
  }
};

// Initialize HUD
export function createUIDialogue() {
  // Initialize state
  hud.state = 'main';
  
  // Hide all UI elements
  Object.values(hud.elements).forEach(el => {
    if (el) el.classList.add('hidden');
  });
  
  // Show loading screen
  hud.elements.loadingScreen?.classList.remove('hidden');
  
  // Set up event listeners
  hud.elements.pauseButton?.addEventListener('click', () => {
    if (hud.state === 'main') {
      hud.state = 'paused';
      hud.elements.pauseScreen?.classList.remove('hidden');
    }
  });
  
  hud.elements.resumeButton?.addEventListener('click', () => {
    hud.state = 'main';
    hud.elements.pauseScreen?.classList.add('hidden');
  });
  
  hud.elements.saveButton?.addEventListener('click', () => {
    if (hud.state === 'paused') {
      // Save game
      saveGame();
    }
  });
  
  hud.elements.loadButton?.addEventListener('click', () => {
    if (hud.state === 'paused') {
      // Load game
      loadGame();
    }
  });
  
  hud.elements.optionsButton?.addEventListener('click', () => {
    if (hud.state === 'paused') {
      // Open options
      openOptions();
    }
  });
  
  hud.elements.retryButton?.addEventListener('click', () => {
    // Retry game
    location.reload();
  });
  
  // Show error screen
  function showError(message: string) {
    hud.elements.errorScreen?.classList.remove('hidden');
    hud.elements.errorMessage?.innerHTML = message;
  }
  
  // Show dialogue
  function showDialogue(content: string, options: Array<{label: string, goto: string, check?: {skill: string, min: number}, action?: string}>) {
    hud.state = 'dialogue';
    hud.elements.dialoguePanel?.classList.remove('hidden');
    hud.elements.dialogueContent?.innerHTML = content;
    
    // Clear options
    hud.elements.dialogueOptions?.innerHTML = '';
    
    // Add options
    options.forEach(opt => {
      const optionBtn = document.createElement('button');
      optionBtn.textContent = opt.label;
      optionBtn.classList.add('bg-gray-700', 'text-white', 'px-4', 'py-2', 'rounded');
      optionBtn.addEventListener('click', () => {
        // Handle option
        handleDialogueOption(opt);
      });
      hud.elements.dialogueOptions?.appendChild(optionBtn);
    });
  }
  
  // Handle dialogue option
  function handleDialogueOption(option: {label: string, goto: string, check?: {skill: string, min: number}, action?: string}) {
    // Check skill requirement
    if (option.check) {
      const {skill, min} = option.check;
      const playerSkill = world.player.skills[skill] || 0;
      if (playerSkill < min) {
        // Skill check failed
        showDialogue("You're not skilled enough for that.", []);
        return;
      }
    }
    
    // Handle action
    if (option.action === 'close') {
      hud.state = 'main';
      hud.elements.dialoguePanel?.classList.add('hidden');
    } else if (option.action === 'save') {
      // Save game
      saveGame();
      hud.state = 'main';
      hud.elements.dialoguePanel?.classList.add('hidden');
    } else if (option.action === 'exit') {
      hud.state = 'main';
      hud.elements.dialoguePanel?.classList.add('hidden');
    }
    
    // Handle goto
    if (option.goto) {
      // Handle goto
      // This would be handled by the dialogue system
    }
  }
  
  // Show combat
  function showCombat(content: string, targets: Array<{id: string, name: string, hp: number}>) {
    hud.state = 'combat';
    hud.elements.combatPanel?.classList.remove('hidden');
    hud.elements.combatContent?.innerHTML = content;
    
    // Clear targets
    hud.elements.combatTargets?.innerHTML = '';
    
    // Add targets
    targets.forEach(target => {
      const targetBtn = document.createElement('button');
      targetBtn.textContent = `${target.name} (${target.hp} HP)`;
      targetBtn.classList.add('bg-red-700', 'text-white', 'px-4', 'py-2', 'rounded');
      targetBtn.addEventListener('click', () => {
        // Handle target selection
        selectCombatTarget(target);
      });
      hud.elements.combatTargets?.appendChild(targetBtn);
    });
  }
  
  // Select combat target
  function selectCombatTarget(target: {id: string, name: string, hp: number}) {
    // Handle target selection
    // This would be handled by the combat system
  }
  
  // Save game
  function saveGame() {
    // Save game logic
    // This would be handled by the save system
    saveSystem.saveSlot = 1; // Set save slot
    saveSystem.saveToLocalStorage();
  }
  
  // Load game
  function loadGame() {
    // Load game logic
    // This would be handled by the save system
    saveSystem.loadFromLocalStorage();
  }
  
  // Open options
  function openOptions() {
    // Open options
    // This would be handled by the settings system
  }
  
  // Close dialogue
  function closeDialogue() {
    hud.state = 'main';
    hud.elements.dialoguePanel?.classList.add('hidden');
  }
  
  // Close combat
  function closeCombat() {
    hud.state = 'main';
    hud.elements.combatPanel?.classList.add('hidden');
  }
  
  return {
    showDialogue,
    closeDialogue,
    showCombat,
    closeCombat,
    showError
  };
}

// Global dialogue UI
export const dialogueUI = createUIDialogue();