
import type { DrawFunction } from '@/lib/types';
import { hexToHsl } from './helpers';

export const drawParticleExplosions: DrawFunction = ({ ctx, freqData, width, height, config }) => {
    try {
        ctx.save();
        const transform = config.visualizerTransform;
        
        const centerX = width / 2;
        const centerY = height / 2;

        if (transform) {
            const offsetX = width * (transform.offsetX / 100);
            const offsetY = height * (transform.offsetY / 100);
            
            ctx.translate(centerX + offsetX, centerY + offsetY);
            ctx.rotate(transform.rotation * Math.PI / 180);
            ctx.scale(transform.size / 100, transform.size / 100);
            // Don't translate back, because the logic is centered.
        }

        const color = config.colors?.['particles']?.[0] || '#e025e5';
        const hsl = hexToHsl(color);

        const bass = (freqData.slice(0, 5).reduce((a,b) => a+b, 0) / 5) / 255;

        if (!(ctx as any).__particles) {
            (ctx as any).__particles = [];
        }
        const particles: {x: number, y: number, vx: number, vy: number, life: number, hue: number}[] = (ctx as any).__particles;

        if (bass > 0.6 && Math.random() > 0.5) {
            const baseHue = hsl ? hsl.h : 300;
            const hue = baseHue + (Math.random() * 60 - 30);
            for (let i = 0; i < 20 * bass; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 8 * bass + 1;
                particles.push({
                    x: 0, // Draw from new origin
                    y: 0,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 100,
                    hue: hue
                });
            }
        }

        ctx.globalCompositeOperation = 'lighter';
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.life -= 1;
            
            if (p.life <= 0) {
                particles.splice(i, 1);
            } else {
                ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.life / 100 * 0.8})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.life / 30, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
    } catch (e) {
        console.error("Error in drawParticleExplosions:", e);
    }
};
