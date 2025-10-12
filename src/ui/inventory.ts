import { world } from '../main';

// Inventory UI
export function createInventory() {
  // Generate inventory
  const inventory = world.player.inv;
  
  // Create inventory element
  const inventoryEl = document.createElement('div');
  inventoryEl.classList.add('bg-black', 'bg-opacity-90', 'border-t', 'border-gray-600', 'w-full', 'max-w-md', 'p-4', 'text-white');
  
  // Add inventory content
  inventoryEl.innerHTML = `<h2 class="text-lg font-bold mb-4">Inventory</h2>`;
  
  // Add items
  inventory.forEach(item => {
    inventoryEl.innerHTML += `<p class="mb-2">${item.count} x ${item.id}</p>`;
  });
  
  // Return inventory element
  return inventoryEl;
}

// Global inventory
export const inventory = createInventory();