import { createWorld } from './engine/ecs';
import { createMap } from './world/map';
import { createSectorManager } from './world/sectors';
import { createSaveSystem } from './engine/save';
import { createInputSystem } from './engine/input';
import { createAudioSystem } from './engine/audio';
import { createUIDialogue } from './ui/hud';
import { createCombatSystem } from './world/combat';
import { createSettings } from './ui/settings';

// Initialize systems
const world = createWorld();
const map = createMap();
const sectorManager = createSectorManager();
const saveSystem = createSaveSystem();
const inputSystem = createInputSystem();
const audioSystem = createAudioSystem();
const dialogueUI = createUIDialogue();
const combatSystem = createCombatSystem();
const settings = createSettings();

// Load or create seed
const urlParams = new URLSearchParams(window.location.search);
const seed = urlParams.get('seed') ? parseInt(urlParams.get('seed')!, 10) : Math.floor(Math.random() * 1000000);
window.gameSeed = seed;

// Initialize game
window.game = {
  world,
  map,
  sectorManager,
  saveSystem,
  inputSystem,
  audioSystem,
  dialogueUI,
  combatSystem,
  settings,
  seed
};

// Start game loop
function gameLoop() {
  // Update systems
  sectorManager.update();
  inputSystem.update();
  map.update();
  // Render
  map.render();
  requestAnimationFrame(gameLoop);
}

// Start the game
window.addEventListener('load', () => {
  setTimeout(() => {
    gameLoop();
    document.getElementById('loading-screen')?.classList.add('hidden');
  }, 500);
});