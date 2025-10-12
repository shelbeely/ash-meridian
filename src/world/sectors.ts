import { world } from '../main';
import { rng } from '../engine/rng';
import { saveSystem } from '../engine/save';
import { map } from './map';

// Sector dimensions
const SECTOR_SIZE = 64;

// Cache settings
const CACHE_SIZE = 3;

// Sector cache
const sectorCache = new Map<string, any>();

// Current sectors
const currentSectors = new Set<string>();

// Sector data
const sectors = {
  // Sector data
  data: {
    "dry_mile_outpost": {
      "name": "dry_mile_outpost",
      "w": SECTOR_SIZE,
      "h": SECTOR_SIZE,
      "tileSize": 16,
      "tileset": "assets/img/tileset.png",
      "layers": [
        {
          "name": "ground",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        },
        {
          "name": "props",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        }
      ],
      "colliders": [
        {
          "x": 20,
          "y": 12,
          "w": 2,
          "h": 1
        }
      ],
      "triggers": [
        {
          "x": 8,
          "y": 4,
          "type": "enter_area",
          "data": {
            "id": "bar"
          }
        },
        {
          "x": 22,
          "y": 11,
          "type": "dialogue",
          "data": {
            "npc": "jala",
            "node": "root"
          }
        }
      ],
      "exits": [
        {
          "x": 63,
          "y": 32,
          "to": "salt_flats",
          "tx": 0,
          "ty": 32
        }
      ]
    },
    "salt_flats": {
      "name": "salt_flats",
      "w": SECTOR_SIZE,
      "h": SECTOR_SIZE,
      "tileSize": 16,
      "tileset": "assets/img/tileset.png",
      "layers": [
        {
          "name": "ground",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        },
        {
          "name": "props",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        }
      ],
      "colliders": [
        {
          "x": 20,
          "y": 12,
          "w": 2,
          "h": 1
        }
      ],
      "triggers": [
        {
          "x": 8,
          "y": 4,
          "type": "enter_area",
          "data": {
            "id": "bar"
          }
        },
        {
          "x": 22,
          "y": 11,
          "type": "dialogue",
          "data": {
            "npc": "jala",
            "node": "root"
          }
        }
      ],
      "exits": [
        {
          "x": 63,
          "y": 32,
          "to": "dry_mile_outpost",
          "tx": 0,
          "ty": 32
        }
      ]
    },
    "rusted_switchyard": {
      "name": "rusted_switchyard",
      "w": SECTOR_SIZE,
      "h": SECTOR_SIZE,
      "tileSize": 16,
      "tileset": "assets/img/tileset.png",
      "layers": [
        {
          "name": "ground",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        },
        {
          "name": "props",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        }
      ],
      "colliders": [
        {
          "x": 20,
          "y": 12,
          "w": 2,
          "h": 1
        }
      ],
      "triggers": [
        {
          "x": 8,
          "y": 4,
          "type": "enter_area",
          "data": {
            "id": "bar"
          }
        },
        {
          "x": 22,
          "y": 11,
          "type": "dialogue",
          "data": {
            "npc": "jala",
            "node": "root"
          }
        }
      ],
      "exits": [
        {
          "x": 63,
          "y": 32,
          "to": "dry_mile_outpost",
          "tx": 0,
          "ty": 32
        }
      ]
    },
    "cracked_aquifer": {
      "name": "cracked_aquifer",
      "w": SECTOR_SIZE,
      "h": SECTOR_SIZE,
      "tileSize": 16,
      "tileset": "assets/img/tileset.png",
      "layers": [
        {
          "name": "ground",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        },
        {
          "name": "props",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        }
      ],
      "colliders": [
        {
          "x": 20,
          "y": 12,
          "w": 2,
          "h": 1
        }
      ],
      "triggers": [
        {
          "x": 8,
          "y": 4,
          "type": "enter_area",
          "data": {
            "id": "bar"
          }
        },
        {
          "x": 22,
          "y": 11,
          "type": "dialogue",
          "data": {
            "npc": "jala",
            "node": "root"
          }
        }
      ],
      "exits": [
        {
          "x": 63,
          "y": 32,
          "to": "dry_mile_outpost",
          "tx": 0,
          "ty": 32
        }
      ]
    },
    "windbreak_ridge": {
      "name": "windbreak_ridge",
      "w": SECTOR_SIZE,
      "h": SECTOR_SIZE,
      "tileSize": 16,
      "tileset": "assets/img/tileset.png",
      "layers": [
        {
          "name": "ground",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        },
        {
          "name": "props",
          "data": Array(SECTOR_SIZE * SECTOR_SIZE).fill(0)
        }
      ],
      "colliders": [
        {
          "x": 20,
          "y": 12,
          "w": 2,
          "h": 1
        }
      ],
      "triggers": [
        {
          "x": 8,
          "y": 4,
          "type": "enter_area",
          "data": {
            "id": "bar"
          }
        },
        {
          "x": 22,
          "y": 11,
          "type": "dialogue",
          "data": {
            "npc": "jala",
            "node": "root"
          }
        }
      ],
      "exits": [
        {
          "x": 63,
          "y": 32,
          "to": "dry_mile_outpost",
          "tx": 0,
          "ty": 32
        }
      ]
    }
  },
  // Sector loading
  load(sectorName: string) {
    // Check if sector is already loaded
    if (currentSectors.has(sectorName)) {
      return;
    }
    
    // Check if sector is in cache
    if (sectorCache.has(sectorName)) {
      // Load from cache
      const sector = sectorCache.get(sectorName);
      sectorCache.delete(sectorName);
      sectorCache.set(sectorName, sector);
      return;
    }
    
    // Load sector from data
    const sector = sectors.data[sectorName];
    if (!sector) {
      console.warn(`Sector ${sectorName} not found`);
      return;
    }
    
    // Add to cache
    if (sectorCache.size >= CACHE_SIZE) {
      // Remove oldest sector
      const oldest = sectorCache.keys().next().value;
      sectorCache.delete(oldest);
    }
    
    // Add sector to cache
    sectorCache.set(sectorName, sector);
    
    // Update current sectors
    currentSectors.add(sectorName);
    
    // Update map
    map.update();
  },
  // Unload sector
  unload(sectorName: string) {
    // Remove from cache
    sectorCache.delete(sectorName);
    
    // Remove from current sectors
    currentSectors.delete(sectorName);
  },
  // Update sectors
  update() {
    // Check if player is near any sector
    const playerX = world.player.pos.x;
    const playerY = world.player.pos.y;
    
    // Check for sector exits
    for (const sectorName in sectors.data) {
      const sector = sectors.data[sectorName];
      
      // Check if player is at exit
      for (const exit of sector.exits) {
        if (playerX === exit.x && playerY === exit.y) {
          // Load new sector
          sectors.load(exit.to);
          
          // Update player position
          world.player.pos.x = exit.tx;
          world.player.pos.y = exit.ty;
          
          // Update map
          map.update();
          
          // Exit
          return;
        }
      }
    }
    
    // Check for sector triggers
    for (const sectorName in sectors.data) {
      const sector = sectors.data[sectorName];
      
      // Check if player is at trigger
      for (const trigger of sector.triggers) {
        if (playerX === trigger.x && playerY === trigger.y) {
          // Handle trigger
          handleTrigger(trigger);
          
          // Update map
          map.update();
          
          // Exit
          return;
        }
      }
    }
    
    // Check for sector colliders
    for (const sectorName in sectors.data) {
      const sector = sectors.data[sectorName];
      
      // Check if player is at collider
      for (const collider of sector.colliders) {
        if (playerX === collider.x && playerY === collider.y) {
          // Handle collider
          handleCollider(collider);
          
          // Update map
          map.update();
          
          // Exit
          return;
        }
      }
    }
    
    // Load nearest sector
    for (const sectorName in sectors.data) {
      const sector = sectors.data[sectorName];
      
      // Check if player is near sector
      if (Math.abs(playerX - 32) < 32 && Math.abs(playerY - 32) < 32) {
        // Load sector
        sectors.load(sectorName);
        
        // Update map
        map.update();
        
        // Exit
        return;
      }
    }
  }
};

// Handle trigger
function handleTrigger(trigger: {x: number, y: number, type: string, data: any}) {
  // Handle trigger type
  if (trigger.type === 'enter_area') {
    // Handle enter area
    console.log(`Entering area ${trigger.data.id}`);
  } else if (trigger.type === 'dialogue') {
    // Handle dialogue
    console.log(`Starting dialogue with ${trigger.data.npc}`);
    
    // Start dialogue
    dialogueUI.showDialogue("Hello, how can I help you?", [
      {label: "Trade", goto: "trade"},
      {label: "Any work? [Speech 40]", check: {skill: "Speech", min: 40}, goto: "work"},
      {label: "Goodbye", action: "close"}
    ]);
  }
}

// Handle collider
function handleCollider(collider: {x: number, y: number, w: number, h: number}) {
  // Handle collider
  console.log(`Collision with collider at ${collider.x}, ${collider.y}`);
}

// Initialize sectors
export function createSectorManager() {
  // Load initial sector
  sectors.load('dry_mile_outpost');
  
  // Update sectors
  function gameLoop() {
    sectors.update();
    requestAnimationFrame(gameLoop);
  }
  
  // Start game loop
  gameLoop();
  
  return sectors;
}

// Global sector manager
export const sectorManager = createSectorManager();