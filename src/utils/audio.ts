// Web Audio API procedural retro sound synthesizer
class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Power switch click & CRT degauss pop
  playPowerOn() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Mechanical switch click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);

    // CRT Degauss / Charging hum
    const humOsc = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    humOsc.type = 'sawtooth';
    humOsc.frequency.setValueAtTime(60, now + 0.05);
    humOsc.frequency.exponentialRampToValueAtTime(120, now + 0.3);
    humOsc.frequency.exponentialRampToValueAtTime(50, now + 0.8);

    humGain.gain.setValueAtTime(0.0, now + 0.05);
    humGain.gain.linearRampToValueAtTime(0.2, now + 0.2);
    humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    humOsc.connect(humGain);
    humGain.connect(this.ctx.destination);

    humOsc.start(now + 0.05);
    humOsc.stop(now + 0.8);
  }

  playPowerOff() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.15);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Mechanical C64 Key Press sound
  playKeyPress() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Noise click
    const bufferSize = this.ctx.sampleRate * 0.03;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800 + Math.random() * 400;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);

    // Mechanical thud
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);
    oscGain.gain.setValueAtTime(0.2, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // 1541 Floppy drive motor step & whirring
  playFloppyMotor() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Step chatter
    for (let i = 0; i < 4; i++) {
      const stepTime = now + i * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + (i % 2) * 200, stepTime);
      gain.gain.setValueAtTime(0.15, stepTime);
      gain.gain.exponentialRampToValueAtTime(0.01, stepTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(stepTime);
      osc.stop(stepTime + 0.03);
    }
  }

  // Disk Insert / Eject click
  playFloppyInsert() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(500, now + 0.1);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Lamp switch click
  playLampSwitch() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Page turn / Notebook rustle
  playPageTurn() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Joystick click
  playJoystickClick() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  // 16-bit C64 Retro Chiptune Background Music Synthesizer
  private musicTimer: number | null = null;
  private isMusicPlaying: boolean = false;
  private currentNoteIdx: number = 0;

  private melody: number[] = [
    261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63, 329.63,
    293.66, 349.23, 440.00, 587.33, 440.00, 349.23, 293.66, 349.23,
    329.63, 392.00, 493.88, 659.25, 493.88, 392.00, 329.63, 392.00,
    349.23, 440.00, 523.25, 698.46, 523.25, 440.00, 349.23, 440.00,
    523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, 523.25, 659.25,
    587.33, 698.46, 880.00, 1174.66, 880.00, 698.46, 587.33, 698.46,
    659.25, 783.99, 987.77, 1318.51, 987.77, 783.99, 659.25, 783.99,
    523.25, 659.25, 783.99, 1046.50, 880.00, 698.46, 587.33, 493.88,
  ];

  private bassline: number[] = [
    130.81, 130.81, 130.81, 130.81, 146.83, 146.83, 146.83, 146.83,
    164.81, 164.81, 164.81, 164.81, 174.61, 174.61, 174.61, 174.61,
  ];

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    this.initCtx();
    if (!this.ctx) return;
    if (this.isMusicPlaying) return;

    this.isMusicPlaying = true;
    this.currentNoteIdx = 0;

    const tempo = 135;
    const stepTimeMs = (60 / tempo / 4) * 1000;

    this.musicTimer = window.setInterval(() => {
      this.playChiptuneStep();
    }, stepTimeMs);
  }

  public stopMusic() {
    if (this.musicTimer !== null) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    this.isMusicPlaying = false;
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  private playChiptuneStep() {
    if (!this.ctx || !this.isMusicPlaying) return;
    const now = this.ctx.currentTime;

    // 1. Arpeggio / Lead Chiptune Synth
    const freq = this.melody[this.currentNoteIdx % this.melody.length];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.09);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);

    // 2. Retro Bass Synth
    if (this.currentNoteIdx % 2 === 0) {
      const bassFreq = this.bassline[Math.floor(this.currentNoteIdx / 2) % this.bassline.length];
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      bassGain.gain.setValueAtTime(0.14, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);

      bassOsc.start(now);
      bassOsc.stop(now + 0.18);
    }

    // 3. 8-Bit Percussion Hi-hat
    if (this.currentNoteIdx % 4 === 2) {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.02);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 5000;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
    }

    this.currentNoteIdx++;
  }

  // Commodore 64 startup beep
  playC64Beep() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, now); // B5 note
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }
}

export const sounds = new SoundEngine();
