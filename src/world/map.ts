import { world } from '../main';
import { rng } from '../engine/rng';
import { saveSystem } from '../engine/save';

// World dimensions
const WORLD_WIDTH = 64;
const WORLD_HEIGHT = 64;

// Tile dimensions
const TILE_SIZE = 16;

// Camera
const camera = {
  x: 0,
  y: 0,
  zoom: 1,
  update() {
    // Update camera position
    this.x = world.player.pos.x * TILE_SIZE - window.innerWidth / 2;
    this.y = world.player.pos.y * TILE_SIZE - window.innerHeight / 2;
  }
};

// Tile map
const map = {
  // Tile layers
  layers: {
    ground: Array(WORLD_WIDTH * WORLD_HEIGHT).fill(0),
    props: Array(WORLD_WIDTH * WORLD_HEIGHT).fill(0),
    objects: Array(WORLD_WIDTH * WORLD_HEIGHT).fill(0)
  },
  // Tile properties
  tiles: {
    0: { name: 'grass', color: '#228B22' }, // grass
    1: { name: 'sand', color: '#F5DEB3' }, // sand
    2: { name: 'rock', color: '#A9A9A9' }, // rock
    3: { name: 'water', color: '#00BFFF' }, // water
    4: { name: 'buildings', color: '#5F9EA0' }, // buildings
    5: { name: 'roads', color: '#000000' }, // roads
    6: { name: 'trees', color: '#228B22' }, // trees
    7: { name: 'bushes', color: '#228B22' }, // bushes
    8: { name: 'flowers', color: '#FF1493' }, // flowers
    9: { name: 'fences', color: '#8B4513' }, // fences
    10: { name: 'crates', color: '#A0522D' }, // crates
    11: { name: 'junk', color: '#9932CC' }, // junk
    12: { name: 'wires', color: '#808080' }, // wires
    13: { name: 'pipes', color: '#008000' }, // pipes
    14: { name: 'hazard', color: '#FF0000' }, // hazard
    15: { name: 'fire', color: '#FF4500' }, // fire
    16: { name: 'smoke', color: '#C0C0C0' }, // smoke
    17: { name: 'clouds', color: '#FFFFFF' }, // clouds
    18: { name: 'stars', color: '#FFFF00' }, // stars
    19: { name: 'moon', color: '#FFFF00' }, // moon
    20: { name: 'sun', color: '#FFD700' }, // sun
    21: { name: 'rain', color: '#87CEEB' }, // rain
    22: { name: 'snow', color: '#F0F8FF' }, // snow
    23: { name: 'wind', color: '#A9A9A9' }, // wind
    24: { name: 'dust', color: '#D2B48C' }, // dust
    25: { name: 'fog', color: '#F5F5F5' }, // fog
    26: { name: 'lightning', color: '#E70082' }, // lightning
    27: { name: 'thunder', color: '#E70082' }, // thunder
    28: { name: 'storm', color: '#E70082' }, // storm
    29: { name: 'tornado', color: '#E70082' }, // tornado
    30: { name: 'hurricane', color: '#E70082' }, // hurricane
    31: { name: 'earthquake', color: '#000000' }, // earthquake
    32: { name: 'volcano', color: '#FF0000' }, // volcano
    33: { name: 'lava', color: '#FF4500' }, // lava
    34: { name: 'ash', color: '#808080' }, // ash
    35: { name: 'smoke', color: '#C0C0C0' }, // smoke
    36: { name: 'fire', color: '#FF4500' }, // fire
    37: { name: 'flame', color: '#FF4500' }, // flame
    38: { name: 'glow', color: '#FF4500' }, // glow
    39: { name: 'light', color: '#FFFF00' }, // light
    40: { name: 'darkness', color: '#000000' } // darkness
  },
  // Tile collision
  collisions: {
    0: false, // grass - passable
    1: false, // sand - passable
    2: true,  // rock - impassable
    3: false, // water - passable (swimming)
    4: true,  // buildings - impassable
    5: false, // roads - passable
    6: false, // trees - passable
    7: false, // bushes - passable
    8: false, // flowers - passable
    9: true,  // fences - impassable
    10: false, // crates - passable
    11: false, // junk - passable
    12: false, // wires - passable
    13: false, // pipes - passable
    14: true,  // hazard - impassable
    15: false, // fire - passable? (can't be touched)
    16: false, // smoke - passable
    17: false, // clouds - passable
    18: false, // stars - passable
    19: false, // moon - passable
    20: false, // sun - passable
    21: false, // rain - passable
    22: false, // snow - passable
    23: false, // wind - passable
    24: false, // dust - passable
    25: false, // fog - passable
    26: false, // lightning - passable (can't be touched)
    27: false, // thunder - passable (can't be touched)
    28: false, // storm - passable
    29: false, // tornado - passable
    30: false, // hurricane - passable
    31: true,  // earthquake - impassable
    32: true,  // volcano - impassable
    33: true,  // lava - impassable
    34: true,  // ash - impassable
    35: true,  // smoke - impassable
    36: true,  // fire - impassable
    37: true,  // flame - impassable
    38: true,  // glow - impassable
    39: true,  // light - impassable
    40: true   // darkness - impassable
  },
  // Tile visibility
  visibility: {
    0: true, // grass - visible
    1: true, // sand - visible
    2: true, // rock - visible
    3: true, // water - visible
    4: true, // buildings - visible
    5: true, // roads - visible
    6: true, // trees - visible
    7: true, // bushes - visible
    8: true, // flowers - visible
    9: true, // fences - visible
    10: true, // crates - visible
    11: true, // junk - visible
    12: true, // wires - visible
    13: true, // pipes - visible
    14: true, // hazard - visible
    15: true, // fire - visible
    16: true, // smoke - visible
    17: true, // clouds - visible
    18: true, // stars - visible
    19: true, // moon - visible
    20: true, // sun - visible
    21: true, // rain - visible
    22: true, // snow - visible
    23: true, // wind - visible
    24: true, // dust - visible
    25: true, // fog - visible
    26: true, // lightning - visible
    27: true, // thunder - visible
    28: true, // storm - visible
    29: true, // tornado - visible
    30: true, // hurricane - visible
    31: true, // earthquake - visible
    32: true, // volcano - visible
    33: true, // lava - visible
    34: true, // ash - visible
    35: true, // smoke - visible
    36: true, // fire - visible
    37: true, // flame - visible
    38: true, // glow - visible
    39: true, // light - visible
    40: true  // darkness - visible
  },
  // Tile render function
  render() {
    // Clear canvas
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear screen
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Render ground layer
    for (let y = 0; y < WORLD_HEIGHT; y++) {
      for (let x = 0; x < WORLD_WIDTH; x++) {
        const tile = map.layers.ground[y * WORLD_WIDTH + x];
        if (tile !== 0) {
          const tileInfo = map.tiles[tile];
          const renderX = x * TILE_SIZE - camera.x;
          const renderY = y * TILE_SIZE - camera.y;
          
          // Check if tile is visible
          if (renderX >= -TILE_SIZE && renderX <= canvas.width + TILE_SIZE &&
              renderY >= -TILE_SIZE && renderY <= canvas.height + TILE_SIZE) {
            ctx.fillStyle = tileInfo.color;
            ctx.fillRect(renderX, renderY, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
    
    // Render props layer
    for (let y = 0; y < WORLD_HEIGHT; y++) {
      for (let x = 0; x < WORLD_WIDTH; x++) {
        const tile = map.layers.props[y * WORLD_WIDTH + x];
        if (tile !== 0) {
          const tileInfo = map.tiles[tile];
          const renderX = x * TILE_SIZE - camera.x;
          const renderY = y * TILE_SIZE - camera.y;
          
          // Check if tile is visible
          if (renderX >= -TILE_SIZE && renderX <= canvas.width + TILE_SIZE &&
              renderY >= -TILE_SIZE && renderY <= canvas.height + TILE_SIZE) {
            ctx.fillStyle = tileInfo.color;
            ctx.fillRect(renderX, renderY, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
    
    // Render objects layer
    for (let y = 0; y < WORLD_HEIGHT; y++) {
      for (let x = 0; x < WORLD_WIDTH; x++) {
        const tile = map.layers.objects[y * WORLD_WIDTH + x];
        if (tile !== 0) {
          const tileInfo = map.tiles[tile];
          const renderX = x * TILE_SIZE - camera.x;
          const renderY = y * TILE_SIZE - camera.y;
          
          // Check if tile is visible
          if (renderX >= -TILE_SIZE && renderX <= canvas.width + TILE_SIZE &&
              renderY >= -TILE_SIZE && renderY <= canvas.height + TILE_SIZE) {
            ctx.fillStyle = tileInfo.color;
            ctx.fillRect(renderX, renderY, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
    
    // Render player
    const playerX = world.player.pos.x * TILE_SIZE - camera.x;
    const playerY = world.player.pos.y * TILE_SIZE - camera.y;
    
    // Check if player is visible
    if (playerX >= -TILE_SIZE && playerX <= canvas.width + TILE_SIZE &&
        playerY >= -TILE_SIZE && playerY <= canvas.height + TILE_SIZE) {
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(playerX, playerY, TILE_SIZE, TILE_SIZE);
    }
  },
  // Update map
  update() {
    camera.update();
  }
};

// Initialize map
export function createMap() {
  // Initialize with random tiles
  for (let i = 0; i < WORLD_WIDTH * WORLD_HEIGHT; i++) {
    map.layers.ground[i] = rng.range(0, 40);
    map.layers.props[i] = rng.range(0, 40);
    map.layers.objects[i] = rng.range(0, 40);
  }
  
  // Set player position
  world.player.pos = { x: 32, y: 32 };
  
  // Set up game loop
  function gameLoop() {
    map.update();
    map.render();
    requestAnimationFrame(gameLoop);
  }
  
  // Start game loop
  gameLoop();
  
  return map;
}

// Global map
export const map = createMap();