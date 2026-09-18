
import type { DrawFunction } from '@/lib/types';

let scanlinePattern: CanvasPattern | null = null;
let lastThickness: number | null = null;

export const drawScanlines: DrawFunction = ({ ctx, width, height, config }) => {
    if (!config) return;
    try {
        const thickness = config.scanlinesConfig?.thickness ?? 1;
        
        if (!scanlinePattern || lastThickness !== thickness) {
            lastThickness = thickness;
            const pCanvas = document.createElement('canvas');
            pCanvas.width = 1;
            pCanvas.height = 4;
            const pCtx = pCanvas.getContext('2d');
            if (pCtx) {
                pCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                pCtx.fillRect(0, 0, 1, thickness);
                scanlinePattern = ctx.createPattern(pCanvas, 'repeat');
            }
        }

        if (scanlinePattern) {
            ctx.fillStyle = scanlinePattern;
            ctx.fillRect(0, 0, width, height);
        }
    } catch (e) {
        console.error("Error in drawScanlines:", e);
    }
};
