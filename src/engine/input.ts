import { world } from '../main';

export function createInputSystem() {
  const keys = new Set<string>();
  const lastKeys = new Set<string>();
  
  window.addEventListener('keydown', (e) => {
    keys.add(e.key.toLowerCase());
    e.preventDefault();
  });
  
  window.addEventListener('keyup', (e) => {
    keys.delete(e.key.toLowerCase());
    e.preventDefault();
  });
  
  return {
    update() {
      lastKeys.clear();
      keys.forEach(k => lastKeys.add(k));
    },
    isDown(key: string): boolean {
      return keys.has(key.toLowerCase());
    },
    justPressed(key: string): boolean {
      return keys.has(key.toLowerCase()) && !lastKeys.has(key.toLowerCase());
    },
    justReleased(key: string): boolean {
      return !keys.has(key.toLowerCase()) && lastKeys.has(key.toLowerCase());
    }
  };
}

// Global input system
export const inputSystem = createInputSystem();