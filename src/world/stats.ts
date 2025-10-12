import { world } from '../main';

// Character attributes
const attributes = {
  Strength: 10,
  Understanding: 10,
  Resolve: 10,
  Vitality: 10,
  Ingenuity: 10,
  Vigor: 10,
  Empathy: 10
};

// Skills
const skills = {
  SmallArms: 10,
  Melee: 10,
  Speech: 10,
  Tinker: 10,
  Medicine: 10,
  Scavenge: 10,
  Sneak: 10
};

// Derived stats
const derived = {
  // Initiative
  initiative(player: any) {
    return 10 + Math.floor((player.stats.Ingenuity + player.stats.Vigor) / 2) + Math.floor(Math.random() * 10) + 1;
  },
  // AP
  ap(player: any) {
    return 4 + Math.floor(player.stats.Resolve / 2);
  },
  // Carry
  carry(player: any) {
    return 10 + Math.floor(player.stats.Strength / 2);
  },
  // CritChance
  critChance(player: any) {
    return 5 + Math.floor(player.stats.Ingenuity / 2);
  }
};

// Character sheet
const charSheet = {
  // Character stats
  stats: attributes,
  // Skills
  skills: skills,
  // Derived stats
  derived: derived,
  // Character display
  display() {
    return {
      // Attributes
      attributes: {
        Strength: this.stats.Strength,
        Understanding: this.stats.Understanding,
        Resolve: this.stats.Resolve,
        Vitality: this.stats.Vitality,
        Ingenuity: this.stats.Ingenuity,
        Vigor: this.stats.Vigor,
        Empathy: this.stats.Empathy
      },
      // Skills
      skills: {
        SmallArms: this.skills.SmallArms,
        Melee: this.skills.Melee,
        Speech: this.skills.Speech,
        Tinker: this.skills.Tinker,
        Medicine: this.skills.Medicine,
        Scavenge: this.skills.Scavenge,
        Sneak: this.skills.Sneak
      },
      // Derived stats
      derived: {
        initiative: derived.initiative(world.player),
        ap: derived.ap(world.player),
        carry: derived.carry(world.player),
        critChance: derived.critChance(world.player)
      }
    };
  }
};

// Global character sheet
export const stats = charSheet;