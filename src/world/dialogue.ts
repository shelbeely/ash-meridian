import { world } from '../main';
import { saveSystem } from '../engine/save';

// Dialogue system
const dialogue = {
  // Dialogue state
  state: 'off', // off, active
  // Dialogue data
  data: {
    // Dialogue tree
    trees: [],
    // Current dialogue
    current: null
  },
  // Dialogue functions
  start() {
    // Start dialogue
    dialogue.state = 'active';
  },
  // End dialogue
  end() {
    // End dialogue
    dialogue.state = 'off';
  },
  // Show dialogue
  show(content: string, options: Array<{label: string, goto: string, check?: {skill: string, min: number}, action?: string}>) {
    // Show dialogue
    dialogue.data.current = {
      content,
      options
    };
    
    // Update dialogue UI
    dialogueUI.showDialogue(content, options);
  },
  // Handle dialogue option
  handleOption(option: {label: string, goto: string, check?: {skill: string, min: number}, action?: string}) {
    // Check skill requirement
    if (option.check) {
      const {skill, min} = option.check;
      const playerSkill = world.player.skills[skill] || 0;
      if (playerSkill < min) {
        // Skill check failed
        dialogueUI.showError("You're not skilled enough for that.");
        return;
      }
    }
    
    // Handle action
    if (option.action === 'close') {
      // Close dialogue
      dialogue.end();
    } else if (option.action === 'save') {
      // Save game
      saveGame();
      dialogue.end();
    } else if (option.action === 'exit') {
      // Exit dialogue
      dialogue.end();
    }
    
    // Handle goto
    if (option.goto) {
      // Handle goto
      // This would be handled by the dialogue system
    }
  }
};

// Save game
function saveGame() {
  // Save game logic
  // This would be handled by the save system
  saveSystem.saveSlot = 1; // Set save slot
  saveSystem.saveToLocalStorage();
}

// Initialize dialogue
export function createDialogueSystem() {
  // Update dialogue
  function gameLoop() {
    if (dialogue.state === 'active') {
      // Update dialogue
    }
    requestAnimationFrame(gameLoop);
  }
  
  // Start game loop
  gameLoop();
  
  return dialogue;
}

// Global dialogue system
export const dialogueSystem = createDialogueSystem();