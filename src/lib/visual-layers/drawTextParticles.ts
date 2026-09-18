
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawTextParticles: DrawFunction = ({ ctx, freqData, width, height, config, frameCount }) => {
    if (!config.textParticlesConfig || !config.colors || !config.visualizerTransform) return;
    try {
        const { text, fontSize, fontFamily, rainbow, speed: configSpeed, spread, sensitivity } = config.textParticlesConfig;
        const { size, rotation, offsetX, offsetY } = config.visualizerTransform;
        const color = config.colors['text-particles']?.[0] || '#FFFFFF';

        if (!(ctx as any).__text_particles) {
            (ctx as any).__text_particles = [];
        }
        const particles: {x: number, y: number, vx: number, vy: number, life: number, char: string, hue: number}[] = (ctx as any).__text_particles;
        
        const bass = freqData.slice(0, 5).reduce((a, b) => a + b, 0) / 5 / 255;
        
        ctx.save();
        ctx.translate(width / 2 + (width * offsetX / 100), height / 2 + (height * offsetY / 100));
        ctx.rotate(rotation * Math.PI / 180);
        
        // Improved spawning logic:
        // 1. Lower threshold modulated by sensitivity
        // 2. More particles spawned
        // 3. Higher performance cap
        const threshold = 0.8 - (sensitivity * 0.7); // sensitivity 1.0 -> threshold 0.1, sensitivity 0.0 -> threshold 0.8
        if (bass > threshold || Math.random() < sensitivity * 0.2) {
            if (particles.length < 150) { // Increased performance cap
                const numParticles = Math.max(1, Math.floor(bass * 5 * sensitivity));
                for (let i = 0; i < numParticles; i++) {
                    const speed = (Math.random() * 5 * bass + 2) * configSpeed;
                    // spread: 0 = point, 100 = full screen
                    const spreadFactor = spread / 100;
                    particles.push({
                        x: (Math.random() - 0.5) * width * 0.9 * spreadFactor, 
                        y: (Math.random() - 0.5) * height * 0.9 * spreadFactor,
                        vx: (Math.random() - 0.5) * speed,
                        vy: (Math.random() - 0.5) * speed,
                        life: 60,
                        char: text.charAt(Math.floor(Math.random() * text.length)),
                        hue: (frameCount * 2 + i * 5) % 360,
                    });
                }
            }
        }
        
        ctx.font = `${(fontSize + bass * 30) * (size/100)}px "${fontFamily}", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.97; // Air drag
            p.vy *= 0.97;
            p.life -= 1.5; // Fade faster

            if (p.life <= 0) {
                particles.splice(i, 1);
            } else {
                 if (rainbow) {
                    ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.life / 100})`;
                 } else {
                    const rgb = hexToRgb(color);
                    if (rgb) {
                        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.life / 100})`;
                    }
                 }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.vx * 0.1);
                ctx.fillText(p.char, 0, 0);
                ctx.restore();
            }
        }
        ctx.restore();
    } catch(e) {
        console.error("Error in drawTextParticles", e);
        if(ctx) ctx.restore();
    }
};
