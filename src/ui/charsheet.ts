import { world } from '../main';
import { stats } from '../world/stats';

// Character sheet UI
export function createCharSheet() {
  // Generate character sheet
  const charSheet = stats.display();
  
  // Create character sheet element
  const charSheetEl = document.createElement('div');
  charSheetEl.classList.add('bg-black', 'bg-opacity-90', 'border-t', 'border-gray-600', 'w-full', 'max-w-md', 'p-4', 'text-white');
  
  // Add character sheet content
  charSheetEl.innerHTML = `
    <h2 class="text-lg font-bold mb-4">Character Sheet</h2>
    <div class="grid grid-cols-2 gap-2 mb-4">
      <div class="font-bold">Attributes</div>
      <div>Strength: ${charSheet.attributes.Strength}</div>
      <div>Understanding: ${charSheet.attributes.Understanding}</div>
      <div>Resolve: ${charSheet.attributes.Resolve}</div>
      <div>Vitality: ${charSheet.attributes.Vitality}</div>
      <div>Ingenuity: ${charSheet.attributes.Ingenuity}</div>
      <div>Vigor: ${charSheet.attributes.Vigor}</div>
      <div>Empathy: ${charSheet.attributes.Empathy}</div>
    </div>
    <div class="grid grid-cols-2 gap-2 mb-4">
      <div class="font-bold">Skills</div>
      <div>Small Arms: ${charSheet.skills.SmallArms}</div>
      <div>Melee: ${charSheet.skills.Melee}</div>
      <div>Speech: ${charSheet.skills.Speech}</div>
      <div>Tinker: ${charSheet.skills.Tinker}</div>
      <div>Medicine: ${charSheet.skills.Medicine}</div>
      <div>Scavenge: ${charSheet.skills.Scavenge}</div>
      <div>Sneak: ${charSheet.skills.Sneak}</div>
    </div>
    <div class="grid grid-cols-2 gap-2 mb-4">
      <div class="font-bold">Derived Stats</div>
      <div>Initiative: ${charSheet.derived.initiative}</div>
      <div>AP: ${charSheet.derived.ap}</div>
      <div>Carry: ${charSheet.derived.carry}</div>
      <div>Crit Chance: ${charSheet.derived.critChance}</div>
    </div>
  `;
  
  // Return character sheet element
  return charSheetEl;
}

// Global character sheet
export const charSheet = createCharSheet();