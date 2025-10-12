import { world } from '../main';
import { rng } from './rng';

// Save format
interface SaveData {
  slot: number;
  seed: number;
  player: {
    stats: Record<string, number>;
    skills: Record<string, number>;
    inv: Array<{id: string, count: number}>;
  };
  flags: Record<string, string>;
  pos: {
    sector: string;
    x: number;
    y: number;
  };
  visited: string[];
  time: string; // ISO time string
}

export function createSaveSystem() {
  const saveSlots = 3;
  const saveData: SaveData[] = [];
  
  // Initialize empty save slots
  for (let i = 0; i < saveSlots; i++) {
    saveData.push({
      slot: i + 1,
      seed: 0,
      player: {
        stats: {},
        skills: {},
        inv: []
      },
      flags: {},
      pos: { sector: '', x: 0, y: 0 },
      visited: [],
      time: 'PT0H0M'
    });
  }
  
  function checksum(data: SaveData): number {
    return data.slot + data.seed + Object.values(data.flags).reduce((sum, v) => sum + v.charCodeAt(0), 0);
  }
  
  function validate(data: SaveData): boolean {
    // Simple validation
    if (data.slot < 1 || data.slot > saveSlots) return false;
    if (data.seed === 0) return false;
    if (Object.keys(data.flags).length > 50) return false; // arbitrary limit
    if (data.visited.length > 100) return false;
    return true;
  }
  
  return {
    saveSlot: 1,
    save(data: SaveData) {
      if (!validate(data)) return false;
      saveData[data.slot - 1] = data;
      return true;
    },
    load(slot: number): SaveData | null {
      if (slot < 1 || slot > saveSlots) return null;
      return { ...saveData[slot - 1] };
    },
    getSlotData(slot: number): SaveData | null {
      if (slot < 1 || slot > saveSlots) return null;
      return saveData[slot - 1];
    },
    setSlot(slot: number) {
      if (slot >= 1 && slot <= saveSlots) {
        this.saveSlot = slot;
      }
    },
    getSlot(): number {
      return this.saveSlot;
    },
    // Load from localStorage
    loadFromLocalStorage() {
      try {
        for (let i = 0; i < saveSlots; i++) {
          const key = `save_${i + 1}`;
          const saved = localStorage.getItem(key);
          if (saved) {
            let data: SaveData;
            try {
              data = JSON.parse(saved);
            } catch (e) {
              console.warn(`Invalid save data for slot ${i + 1}`, e);
              continue;
            }
            if (validate(data)) {
              saveData[i] = data;
            } else {
              console.warn(`Corrupted save data for slot ${i + 1}`);
            }
          }
        }
      } catch (e) {
        console.error('Failed to load saves from localStorage', e);
      }
    },
    // Save to localStorage
    saveToLocalStorage() {
      try {
        for (let i = 0; i < saveSlots; i++) {
          const key = `save_${i + 1}`;
          localStorage.setItem(key, JSON.stringify(saveData[i]));
        }
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    }
  };
}

// Global save system
export const saveSystem = createSaveSystem();