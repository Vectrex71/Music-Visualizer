
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawStrobe: DrawFunction = ({ ctx, width, height, frameCount, freqData, config }) => {
    try {
        const { strobeConfig, colors } = config;
        if (!strobeConfig) return;

        const { mode, speed, bassThreshold, randomInterval } = strobeConfig;
        const color = colors?.['strobe']?.[0] || '#FFFFFF';
        const rgb = hexToRgb(color);
        if (!rgb) return;

        if (!(ctx as any).__strobe_intensity) {
             (ctx as any).__strobe_intensity = 0;
        }
        let intensity: number = (ctx as any).__strobe_intensity;

        let shouldFlash = false;
        if (mode === 'audio') {
            const bass = (freqData.slice(0, 3).reduce((a, b) => a + b, 0) / 3) / 255;
            if (bass > bassThreshold / 100 && intensity <= 0) { // Only flash if not already flashing
                shouldFlash = true;
            }
        } else { // Timed mode
            if (!(ctx as any).__strobe_lastFlash) {
                (ctx as any).__strobe_lastFlash = 0;
                (ctx as any).__strobe_nextInterval = 0;
            }
            
            const now = frameCount;
            if (now > (ctx as any).__strobe_lastFlash + (ctx as any).__strobe_nextInterval) {
                 shouldFlash = true;
                (ctx as any).__strobe_lastFlash = now;
                 
                const baseInterval = 60 / Math.max(1, speed); // 60fps target
                if (randomInterval) {
                     (ctx as any).__strobe_nextInterval = baseInterval * (0.5 + Math.random());
                } else {
                     (ctx as any).__strobe_nextInterval = baseInterval;
                }
            }
        }
        
        if (shouldFlash) {
            intensity = 0.8;
        }
        
        if (intensity > 0) {
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity})`;
            ctx.fillRect(0, 0, width, height);
            intensity -= 0.1; // Fade out
        }
        
        (ctx as any).__strobe_intensity = Math.max(0, intensity);

    } catch (e) {
        console.error("Error in drawStrobe:", e);
    }
};
