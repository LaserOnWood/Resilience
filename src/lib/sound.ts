
/* Ambiance sonore originale de Résilience */

type SoundName = 'foil' | 'tear' | 'sparkle' | 'card';

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  const AudioContextClass = window.AudioContext;

  if (!AudioContextClass) return null;

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  return audioContext;
}

export async function unlockAudio() {
  const context = getAudioContext();

  if (context?.state === 'suspended') {
    await context.resume();
  }
}

function tone(
  context: AudioContext,
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = 'sine',
  delay = 0,
) {
  const start = context.currentTime + delay;

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function noise(
  context: AudioContext,
  duration: number,
  volume: number,
  frequency: number,
  delay = 0,
) {
  const sampleRate = context.sampleRate;
  const buffer = context.createBuffer(
    1,
    Math.ceil(sampleRate * duration),
    sampleRate,
  );

  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  const start = context.currentTime + delay;

  source.buffer = buffer;

  filter.type = 'bandpass';
  filter.frequency.value = frequency;
  filter.Q.value = 0.8;

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  source.start(start);
  source.stop(start + duration);
}

export function playSound(name: SoundName) {
  const context = audioContext;

  if (!context || context.state !== 'running') return;

  switch (name) {
    case 'foil':
      noise(context, 0.18, 0.055, 2400);
      noise(context, 0.12, 0.035, 3600, 0.09);
      break;

    case 'tear':
      noise(context, 0.38, 0.085, 3100);
      noise(context, 0.22, 0.045, 1700, 0.12);
      tone(context, 110, 0.3, 0.025, 'triangle');
      break;

    case 'sparkle':
      tone(context, 660, 0.48, 0.035);
      tone(context, 880, 0.55, 0.03, 'sine', 0.08);
      tone(context, 1320, 0.65, 0.022, 'sine', 0.17);
      tone(context, 1760, 0.75, 0.012, 'sine', 0.28);
      break;

    case 'card':
      noise(context, 0.075, 0.025, 1900);
      tone(context, 740, 0.22, 0.025);
      tone(context, 1110, 0.3, 0.012, 'sine', 0.045);
      break;
  }
}
