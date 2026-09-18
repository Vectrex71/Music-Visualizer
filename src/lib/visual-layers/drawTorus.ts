
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawTorus: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    try {
        const time = frameCount * 0.01;
        const centerX = width / 2;
        const centerY = height / 2;
        
        const sizePercent = config.torusConfig?.size ?? 20;
        const R = Math.min(width, height) * (sizePercent / 100);
        const r = R * 0.4;

        const points = [];
        const numMajor = 40;
        const numMinor = 20;

        for (let i = 0; i < numMajor; i++) {
            for (let j = 0; j < numMinor; j++) {
                const phi = (i / numMajor) * 2 * Math.PI;
                const theta = (j / numMinor) * 2 * Math.PI;

                const x = (R + r * Math.cos(theta)) * Math.cos(phi);
                const y = r * Math.sin(theta);
                const z = (R + r * Math.cos(theta)) * Math.sin(phi);
                
                points.push({x, y, z});
            }
        }

        const angleX = time * 0.5;
        const angleY = time;
        const rotatedPoints = points.map(p => {
            let x = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
            let z = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);
            let y = p.y * Math.cos(angleX) - z * Math.sin(angleX);
            z = p.y * Math.sin(angleX) + z * Math.cos(angleX);
            return { x, y, z };
        });
        
        const color = config.colors?.['torus']?.[0] || '#5737e5';
        const rgb = hexToRgb(color);
        if(!rgb) return;

        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`;
        ctx.lineWidth = 1;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        
        for (let i = 0; i < numMajor; i++) {
            ctx.beginPath();
            for(let j = 0; j <= numMinor; j++) {
                const index = i * numMinor + (j % numMinor);
                const p = rotatedPoints[index];
                const perspective = 3 / (3 - p.z / R);
                const projX = centerX + p.x * perspective;
                const projY = centerY + p.y * perspective;
                if(j === 0) ctx.moveTo(projX, projY);
                else ctx.lineTo(projX, projY);
            }
            ctx.stroke();
        }

    } catch (e) {
        console.error("Error in drawTorus:", e);
    }
};
