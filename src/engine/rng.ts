export class RNG {
  private seed: number;
  private state: number;
  
  constructor(seed: number) {
    this.seed = seed;
    this.state = seed;
  }
  
  // Simple xorshift-based PRNG
  next(): number {
    this.state ^= this.state << 13;
    this.state ^= this.state >>> 17;
    this.state ^= this.state << 5;
    return this.state >>> 0;
  }
  
  // Get a deterministic number in range [min, max]
  range(min: number, max: number): number {
    return Math.floor(this.next() % (max - min + 1)) + min;
  }
  
  // Get a deterministic boolean (50/50)
  bool(): boolean {
    return this.next() & 1;
  }
  
  // Get a deterministic float in [0, 1)
  float(): number {
    return this.next() / 0xFFFFFFFF;
  }
  
  // Get a deterministic float in [min, max]
  floatRange(min: number, max: number): number {
    return min + this.float() * (max - min);
  }
}

// Global RNG instance
export const rng = new RNG(0);

// Set seed
export function setSeed(seed: number) {
  rng.seed = seed;
  rng.state = seed;
}

// Get a new RNG instance with specified seed
export function newRNG(seed: number): RNG {
  return new RNG(seed);
}