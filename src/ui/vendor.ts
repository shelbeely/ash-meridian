import { world } from '../main';

// Vendor UI
export function createVendor() {
  // Generate vendor
  const vendor = {
    items: [
      {id: 'water', cost: 5},
      {id: 'food', cost: 10},
      {id: 'bandage', cost: 15}
    ]
  };
  
  // Create vendor element
  const vendorEl = document.createElement('div');
  vendorEl.classList.add('bg-black', 'bg-opacity-90', 'border-t', 'border-gray-600', 'w-full', 'max-w-md', 'p-4', 'text-white');
  
  // Add vendor content
  vendorEl.innerHTML = `<h2 class="text-lg font-bold mb-4">Vendor</h2>`;
  
  // Add items
  vendor.items.forEach(item => {
    vendorEl.innerHTML += `<p class="mb-2">${item.id} - $${item.cost}</p>`;
  });
  
  // Return vendor element
  return vendorEl;
}

// Global vendor
export const vendor = createVendor();