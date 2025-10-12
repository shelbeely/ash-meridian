import { world } from '../main';

// Settings UI
export function createSettings() {
  // Generate settings
  const settings = {
    textScale: 100,
    motion: true,
    audio: {
      master: 1,
      music: 1,
      sfx: 1
    }
  };
  
  // Create settings element
  const settingsEl = document.createElement('div');
  settingsEl.classList.add('bg-black', 'bg-opacity-90', 'border-t', 'border-gray-600', 'w-full', 'max-w-md', 'p-4', 'text-white');
  
  // Add settings content
  settingsEl.innerHTML = `
    <h2 class="text-lg font-bold mb-4">Settings</h2>
    <div class="mb-4">
      <label class="block mb-2">Text Scale: ${settings.textScale}%</label>
      <input type="range" min="100" max="150" value="${settings.textScale}" class="w-full">
    </div>
    <div class="mb-4">
      <label class="block mb-2">Motion: ${settings.motion ? 'On' : 'Off'}</label>
      <input type="checkbox" class="toggle" ${settings.motion ? 'checked' : ''}>
    </div>
    <div class="mb-4">
      <label class="block mb-2">Master Volume: ${Math.round(settings.audio.master * 100)}%</label>
      <input type="range" min="0" max="1" step="0.01" value="${settings.audio.master}" class="w-full">
    </div>
    <div class="mb-4">
      <label class="block mb-2">Music Volume: ${Math.round(settings.audio.music * 100)}%</label>
      <input type="range" min="0" max="1" step="0.01" value="${settings.audio.music}" class="w-full">
    </div>
    <div class="mb-4">
      <label class="block mb-2">SFX Volume: ${Math.round(settings.audio.sfx * 100)}%</label>
      <input type="range" min="0" max="1" step="0.01" value="${settings.audio.sfx}" class="w-full">
    </div>
  `;
  
  // Set up event listeners
  const textScaleSlider = settingsEl.querySelector('input[type="range"]') as HTMLInputElement;
  const motionCheckbox = settingsEl.querySelector('input[type="checkbox"]') as HTMLInputElement;
  const masterVolumeSlider = settingsEl.querySelectorAll('input[type="range"]')[1] as HTMLInputElement;
  const musicVolumeSlider = settingsEl.querySelectorAll('input[type="range"]')[2] as HTMLInputElement;
  const sfxVolumeSlider = settingsEl.querySelectorAll('input[type="range"]')[3] as HTMLInputElement;
  
  textScaleSlider.addEventListener('input', () => {
    // Update text scale
    document.body.style.fontSize = `${textScaleSlider.value}px`;
  });
  
  motionCheckbox.addEventListener('change', () => {
    // Update motion
    settings.motion = motionCheckbox.checked;
    if (!settings.motion) {
      // Disable animations
      document.body.classList.add('motion-disabled');
    } else {
      // Enable animations
      document.body.classList.remove('motion-disabled');
    }
  });
  
  masterVolumeSlider.addEventListener('input', () => {
    // Update master volume
    settings.audio.master = parseFloat(masterVolumeSlider.value);
    // Update audio volume
    if (audioSystem) {
      audioSystem.setMasterVolume(settings.audio.master);
    }
  });
  
  musicVolumeSlider.addEventListener('input', () => {
    // Update music volume
    settings.audio.music = parseFloat(musicVolumeSlider.value);
    // Update audio volume
    if (audioSystem) {
      audioSystem.setMasterVolume(settings.audio.music);
    }
  });
  
  sfxVolumeSlider.addEventListener('input', () => {
    // Update SFX volume
    settings.audio.sfx = parseFloat(sfxVolumeSlider.value);
    // Update audio volume
    if (audioSystem) {
      audioSystem.setMasterVolume(settings.audio.sfx);
    }
  });
  
  // Return settings element
  return settingsEl;
}

// Global settings
export const settings = createSettings();