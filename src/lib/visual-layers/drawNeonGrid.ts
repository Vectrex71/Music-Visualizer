
import type { DrawFunction } from '@/lib/types';
import { hexToRgb, interpolateRgb } from './helpers';

export const drawNeonGrid: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    if (!config) return;
    try {
        const { neonGridConfig } = config;
        if (!neonGridConfig) return;

        const { rotation, thickness, horizon: horizonPercent, waveAmplitude: wavePercent, perspective, waveEnabled, scrollSpeed, doubleHorizontalSpacing, doubleVerticalSpacing, offsetX = 0, offsetY = 0 } = neonGridConfig;

        const p = perspective / 100;

        const color1 = config.colors?.['neon-grid']?.[0] || '#e025e5';
        const color2 = config.colors?.['neon-grid']?.[1] || '#5737e5';

        const centerX = width / 2;
        const centerY = height / 2;
        
        ctx.save();
        ctx.translate(centerX + (width * offsetX / 100), centerY + (height * offsetY / 100));
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-centerX, -centerY);
        
        const time = frameCount * 0.01;

        const horizonY = height * (horizonPercent / 100) + (waveEnabled ? Math.cos(time) * (height * (wavePercent / 100)) : 0);
        const vanishX = width / 2 + (waveEnabled ? Math.sin(time * 0.5) * (width * 0.2) : 0);
        
        const effectiveScrollSpeed = scrollSpeed ?? 1.5;
        const scroll = frameCount * 0.015 * effectiveScrollSpeed;
        
        const numHorizontalLines = 30;

        ctx.lineWidth = thickness;
        // Removed expensive shadowBlur for performance
        
        const rotatedWidth = width * Math.abs(Math.cos(rotation * Math.PI/180)) + height * Math.abs(Math.sin(rotation * Math.PI/180));
        const startX = centerX - rotatedWidth / 2;
        const endX = centerX + rotatedWidth / 2;

        // --- Horizontal Lines ---
        ctx.shadowColor = color1;
        
        const hScroll = scroll % (doubleHorizontalSpacing ? 2 : 1);
        
        for (let i = 0; i < numHorizontalLines; i += 1) {
            if (doubleHorizontalSpacing && (i % 2 !== 0)) continue;

            const rowProgress = ((i + hScroll) / numHorizontalLines);
            
            const exponent = 1 * (1 - p) + 2.5 * p; // linear (p=0) to exponential (p=1)
            const perspectiveFactor = Math.pow(rowProgress, exponent);
            const y = horizonY + (height - horizonY) * perspectiveFactor;

            if (y > horizonY && y < height * 1.5) { // Draw past the bottom edge
                const alpha = 0.8; // Constant alpha for horizontal lines as requested
                const lineColorRgb = interpolateRgb(color1, color2, perspectiveFactor);
                
                if (lineColorRgb) {
                    ctx.strokeStyle = `rgba(${lineColorRgb.r}, ${lineColorRgb.g}, ${lineColorRgb.b}, ${alpha})`;
                } else {
                    ctx.strokeStyle = `rgba(224, 37, 229, ${alpha})`; // Fallback
                }

                ctx.beginPath();
                ctx.moveTo(startX - 100, y); // Draw wider to account for rotation
                ctx.lineTo(endX + 100, y);
                ctx.stroke();
            }
        }
        
        // --- Vertical Lines ---
        ctx.shadowColor = color2;
        const rgb2 = hexToRgb(color2);
        
        const numVerticalLines = 40;
        for (let j = -numVerticalLines; j <= numVerticalLines; j++) {
            if (doubleVerticalSpacing && j % 2 !== 0) continue;
            const ratio = j / numVerticalLines; 
            const xAtBottom = width / 2 + ratio * rotatedWidth * 0.75; 

            const topX = p * vanishX + (1 - p) * xAtBottom;
            
            ctx.beginPath();
            ctx.moveTo(topX, horizonY);
            ctx.lineTo(xAtBottom, height * 1.5); // Draw past the bottom edge
            
            if (rgb2) {
                const alpha = (1 - Math.abs(j / numVerticalLines)) * 0.7;
                ctx.strokeStyle = `rgba(${rgb2.r}, ${rgb2.g}, ${rgb2.b}, ${alpha})`;
                ctx.stroke();
            }
        }
        ctx.restore();

    } catch (e) {
        console.error("Error in drawNeonGrid:", e);
    }
};
