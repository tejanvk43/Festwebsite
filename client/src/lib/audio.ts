const audioCtx = typeof window !== "undefined" ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

export const playRetroSound = (type: "click" | "select" | "back") => {
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const startTime = audioCtx.currentTime;

    if (type === "click") {
        // Sharp high pitch blip (D-pad)
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(600, startTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, startTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
        oscillator.start();
        oscillator.stop(startTime + 0.1);
    } else if (type === "select") {
        // Rising tone (A button)
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(400, startTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, startTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
        oscillator.start();
        oscillator.stop(startTime + 0.2);
    } else if (type === "back") {
        // Falling tone (B button)
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(300, startTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, startTime + 0.15);
        gainNode.gain.setValueAtTime(0.1, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
        oscillator.start();
        oscillator.stop(startTime + 0.15);
    }
};
