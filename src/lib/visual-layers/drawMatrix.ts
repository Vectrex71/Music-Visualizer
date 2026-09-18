
import type { DrawFunction } from '@/lib/types';
import { hexToHsl, hexToRgb } from './helpers';

export const drawMatrix: DrawFunction = ({ ctx, width, height, config }) => {
    if (!config) return;
    try {
        const { matrixConfig } = config;
        if (!matrixConfig) return;

        const { fontSize, rotation, offsetX = 0, offsetY = 0 } = matrixConfig;

        // --- Off-screen canvas setup for isolated rendering ---
        if (!(ctx as any).__matrix_canvas) {
            (ctx as any).__matrix_canvas = document.createElement('canvas');
            // Initialize streams to null to force re-creation on first run or resize
            (ctx as any).__matrix_streams = null; 
        }
        const matrixCanvas: HTMLCanvasElement = (ctx as any).__matrix_canvas;
        if (matrixCanvas.width !== width || matrixCanvas.height !== height) {
            matrixCanvas.width = width;
            matrixCanvas.height = height;
            (ctx as any).__matrix_streams = null; // Force re-creation on resize
        }
        const matrixCtx = matrixCanvas.getContext('2d');
        if (!matrixCtx) return;
        // --- End setup ---

        const color = config.colors?.['matrix']?.[0] || '#00FF46';
        const rgb = hexToRgb(color);
        if (!rgb) return;
        
        const hsl = hexToHsl(color);
        const brightColor = hsl ? `hsl(${hsl.h}, ${hsl.s}%, 95%)` : '#FFFFFF';

        const FONT_SIZE = fontSize;
        
        // --- Fix for rotation gaps by calculating needed columns ---
        const rad = rotation * Math.PI / 180;
        const effectiveWidth = width * Math.abs(Math.cos(rad)) + height * Math.abs(Math.sin(rad));
        const columns = Math.ceil(effectiveWidth / FONT_SIZE);
        const xStart = (width - effectiveWidth) / 2;
        // --- End fix ---

        const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';

        if (!(ctx as any).__matrix_streams || (ctx as any).__matrix_fontSize !== FONT_SIZE || (ctx as any).__matrix_columns !== columns) {
            (ctx as any).__matrix_fontSize = FONT_SIZE;
            (ctx as any).__matrix_columns = columns;
            (ctx as any).__matrix_streams = Array.from({ length: columns }, (_, i) => ({
                x: xStart + i * FONT_SIZE, // Use new start position
                y: Math.random() * height,
                speed: Math.random() * 2 + 0.5,
                chars: Array.from({ length: Math.floor(Math.random() * 20 + 10) }, () => chars.charAt(Math.floor(Math.random() * chars.length)))
            }));
        }
        const streams: { y: number; speed: number, x: number, chars: string[] }[] = (ctx as any).__matrix_streams;

        // --- Draw on off-screen canvas ---
        matrixCtx.globalCompositeOperation = 'source-over';
        matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        matrixCtx.fillRect(0, 0, width, height);
        
        matrixCtx.globalCompositeOperation = 'lighter';
        matrixCtx.font = `${FONT_SIZE}px monospace`;

        streams.forEach(stream => {
            for (let j = 0; j < stream.chars.length; j++) {
                const char = stream.chars[j];
                const y = stream.y - (j * FONT_SIZE);
                if (y > height + FONT_SIZE || y < 0) continue;

                if (j === 0) {
                    matrixCtx.fillStyle = brightColor;
                } else {
                    const brightness = 1 - (j / stream.chars.length);
                    matrixCtx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${brightness * 0.7})`;
                }
                matrixCtx.fillText(char, stream.x, y);
            }
            stream.y += stream.speed;
            if (stream.y - stream.chars.length * FONT_SIZE > height) {
                stream.y = 0;
            }
        });
        // --- End drawing on off-screen ---
        
        // --- Draw off-screen canvas to main canvas with rotation and offset ---
        ctx.save();
        const centerX = width / 2;
        const centerY = height / 2;
        ctx.translate(centerX + (width * offsetX / 100), centerY + (height * offsetY / 100));
        ctx.rotate(rad);
        ctx.translate(-centerX, -centerY);
        ctx.globalCompositeOperation = 'lighter';
        ctx.drawImage(matrixCanvas, 0, 0);
        ctx.restore();

    } catch (e) {
        console.error("Error in drawMatrix:", e);
    }
};
