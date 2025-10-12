import { world } from '../main';

// Global audio context
let audioContext: AudioContext | null = null;

export function createAudioSystem() {
  // Initialize audio context on first interaction
  function initAudio() {
    if (!audioContext) {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported', e);
      }
    }
  }
  
  // Create a sound with master volume
  function createSound(url: string, options: { volume?: number, loop?: boolean } = {}) {
    const { volume = 1, loop = false } = options;
    
    if (!audioContext) {
      initAudio();
      if (!audioContext) return null;
    }
    
    return new Promise<HTMLAudioElement>((resolve) => {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.loop = loop;
      
      // Play immediately for iOS
      audio.play().then(() => {
        // Apply volume after play
        audio.volume = volume;
        resolve(audio);
      }).catch(() => {
        // If play fails, fall back to static audio
        const audioElement = new Audio(url);
        audioElement.volume = volume;
        audioElement.loop = loop;
        resolve(audioElement);
      });
    });
  }
  
  // Create a sound effect with volume control
  function createSFX(url: string, options: { volume?: number } = {}) {
    const { volume = 1 } = options;
    
    if (!audioContext) {
      initAudio();
      if (!audioContext) return null;
    }
    
    return new Promise<HTMLAudioElement>((resolve) => {
      const audio = new Audio(url);
      audio.volume = volume;
      
      // Play immediately for iOS
      audio.play().then(() => {
        // Apply volume after play
        audio.volume = volume;
        resolve(audio);
      }).catch(() => {
        // If play fails, fall back to static audio
        const audioElement = new Audio(url);
        audioElement.volume = volume;
        resolve(audioElement);
      });
    });
  }
  
  // Create music with master volume
  function createMusic(url: string, options: { volume?: number, loop?: boolean } = {}) {
    const { volume = 1, loop = true } = options;
    
    if (!audioContext) {
      initAudio();
      if (!audioContext) return null;
    }
    
    return new Promise<HTMLAudioElement>((resolve) => {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.loop = loop;
      
      // Play immediately for iOS
      audio.play().then(() => {
        // Apply volume after play
        audio.volume = volume;
        resolve(audio);
      }).catch(() => {
        // If play fails, fall back to static audio
        const audioElement = new Audio(url);
        audioElement.volume = volume;
        audioElement.loop = loop;
        resolve(audioElement);
      });
    });
  }
  
  return {
    init: initAudio,
    createSound,
    createSFX,
    createMusic,
    // Master volume control
    setMasterVolume(volume: number) {
      if (audioContext) {
        // This is a simplified approach; full volume control would require
        // audio nodes and gain nodes
        // For now, we'll just set the volume on individual sounds
      }
    }
  };
}

// Global audio system
export const audioSystem = createAudioSystem();