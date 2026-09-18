
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawCheckerboard: DrawFunction = ({ ctx, frameCount, width, height, config }) => {
    try {
        const { checkerboardConfig } = config;
        if (!checkerboardConfig) return;
        const { rotation = 0, perspective = 60, offsetX = 0, offsetY = 0 } = checkerboardConfig;

        const color = config.colors?.['checkerboard']?.[0] || '#e025e5';
        const rgb = hexToRgb(color);
        if(!rgb) return;

        ctx.save();
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.translate(centerX + (width * offsetX / 100), centerY + (height * offsetY / 100));
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-centerX, -centerY);

        const horizon = height * (perspective / 100);
        const totalRows = 30;
        const scrollSpeed = 0.015;
        const scroll = frameCount * scrollSpeed;
        const vanishPoint = width / 2;

        for (let i = 0; i < totalRows; i++) {
            const perspectivePower = 2.5;

            const rowProgress = ((i - (scroll % 1)) / totalRows);
            const perspectiveFactor = Math.pow(rowProgress, perspectivePower);
            const y = horizon + (height - horizon) * perspectiveFactor;
            
            const rowProgressNext = (((i + 1) - (scroll % 1)) / totalRows);
            const perspectiveFactorNext = Math.pow(rowProgressNext, perspectivePower);
            const yNext = horizon + (height - horizon) * perspectiveFactorNext;
            
            if (y > height * 1.5) continue;

            const numCols = 10;
            const patternRow = i + Math.floor(scroll);

            for (let j = 0; j < numCols; j++) {
                if ((patternRow + j) % 2 !== 0) continue; 
                
                const x1_top = vanishPoint + ((j / numCols) * width - vanishPoint) * perspectiveFactor;
                const x2_top = vanishPoint + (((j + 1) / numCols) * width - vanishPoint) * perspectiveFactor;
                
                const x1_bottom = vanishPoint + ((j / numCols) * width - vanishPoint) * perspectiveFactorNext;
                const x2_bottom = vanishPoint + (((j + 1) / numCols) * width - vanishPoint) * perspectiveFactorNext;
                
                const alpha = (1 - rowProgress) * 0.9;
                ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

                ctx.beginPath();
                ctx.moveTo(x1_top, y);
                ctx.lineTo(x2_top, y);
                ctx.lineTo(x2_bottom, yNext);
                ctx.lineTo(x1_bottom, yNext);
                ctx.closePath();
                ctx.fill();
            }
        }
        ctx.restore();
    } catch (e) {
        console.error("Error in drawCheckerboard:", e);
        if(ctx) ctx.restore();
    }
};
