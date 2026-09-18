
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawVignette: DrawFunction = ({ ctx, width, height, config }) => {
    try {
        const { vignetteConfig } = config;
        if (!vignetteConfig) {
            // Default behavior if no config for some reason
            const outerRadius = width * 0.7;
            const innerRadius = width * 0.3;
            const gradient = ctx.createRadialGradient(width/2, height/2, innerRadius, width/2, height/2, outerRadius);
            gradient.addColorStop(0, 'rgba(0,0,0,0)');
            gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            return;
        }

        const { color, intensity, size } = vignetteConfig;
        
        const rgb = hexToRgb(color);
        if (!rgb) return;

        // 'size' now controls the radius of the central clear area (0-100%)
        const innerRadius = (Math.max(width, height) / 2) * (size / 100);
        
        // 'outerRadius' is where the vignette is at full intensity
        const outerRadius = Math.max(width, height) * 0.7;
        
        const gradient = ctx.createRadialGradient(width/2, height/2, innerRadius, width/2, height/2, outerRadius);
        
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        
        // 'intensity' controls the opacity at the outer edge (0-100%)
        const finalIntensity = intensity / 100;
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${finalIntensity})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

    } catch (e) {
        console.error("Error in drawVignette:", e);
    }
};
