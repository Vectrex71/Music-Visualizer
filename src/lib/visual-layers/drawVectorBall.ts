
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawVectorBall: DrawFunction = ({ ctx, frameCount, width, height, freqData, config }) => {
    try {
        const { vectorBallConfig, colors, visualizerTransform } = config;
        if (!vectorBallConfig || !visualizerTransform) {
             if (config.vectorBallConfig) { // Only log if we expect it to work
                console.error("VectorBall is missing transform config");
             }
             return;
        }
        
        ctx.save();
        
        const centerX = width / 2;
        const centerY = height / 2;

        if (visualizerTransform) {
            const offsetX = width * (visualizerTransform.offsetX / 100);
            const offsetY = height * (visualizerTransform.offsetY / 100);
            
            ctx.translate(centerX + offsetX, centerY + offsetY);
            ctx.rotate(visualizerTransform.rotation * Math.PI / 180);
            ctx.scale(visualizerTransform.size / 100, visualizerTransform.size / 100);
        } else {
            ctx.translate(centerX, centerY);
        }


        const { rotationSpeed, dotSize, musicReactive, shape, rainbow } = vectorBallConfig;
        const color = colors?.['vector-ball']?.[0] || '#FFFFFF';
        

        const time = frameCount * 0.005 * rotationSpeed;
        const bass = musicReactive ? freqData.slice(0, 5).reduce((a, b) => a + b, 0) / 5 / 255 : 0;

        const numDots = 500;
        const radius = Math.min(width, height) * 0.34; // Increased from 0.25 to make it fill screen at 300%
        
        // Initialize dots if they don't exist
        if (!(ctx as any).__vector_dots || (ctx as any).__vector_radius !== radius) {
            (ctx as any).__vector_radius = radius;
            (ctx as any).__vector_dots = [];
            for (let i = 0; i < numDots; i++) {
                const theta = Math.acos(-1 + (2 * i) / numDots);
                const phi = Math.sqrt(numDots * Math.PI) * theta;
                (ctx as any).__vector_dots.push({
                    x: radius * Math.cos(phi) * Math.sin(theta),
                    y: radius * Math.sin(phi) * Math.sin(theta),
                    z: radius * Math.cos(theta),
                });
            }
        }
        
        const dots: {x:number, y:number, z:number}[] = (ctx as any).__vector_dots;
        
        const angleX = time;
        const angleY = time * 0.8;

        const pulseFactor = 1 + bass * 0.4; // Stronger sphere breathing effect

        const rotatedDots = dots.map(p => {
            let x = p.x * pulseFactor;
            let y = p.y * pulseFactor;
            let z = p.z * pulseFactor;
            
            // Rotate Y
            let newX = x * Math.cos(angleY) - z * Math.sin(angleY);
            let newZ = x * Math.sin(angleY) + z * Math.cos(angleY);
            x = newX; z = newZ;
            
            // Rotate X
            let newY = y * Math.cos(angleX) - z * Math.sin(angleX);
            newZ = y * Math.sin(angleX) + z * Math.cos(angleX);
            y = newY; z = newZ;
            
            return { x, y, z };
        });

        rotatedDots.sort((a,b) => a.z - b.z); // z-sorting

        const focalLength = radius * 2.5; // Adjusted to prevent negative radius on resize

        rotatedDots.forEach(p => {
            const perspective = focalLength / (focalLength - p.z);
            const projX = p.x * perspective;
            const projY = p.y * perspective;
            const size = dotSize * perspective * (1 + bass * 2);
            
            const alpha = (p.z + radius) / (2 * radius);
            
            if (rainbow) {
                const hue = (time * 50 + p.y) % 360;
                ctx.fillStyle = `hsla(${hue < 0 ? hue + 360 : hue}, 90%, 70%, ${alpha * 0.8})`;
            } else {
                const rgb = hexToRgb(color);
                if(!rgb) return;
                ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.8})`;
            }

            ctx.beginPath();
            const finalSize = Math.max(0, size / 2);
            switch (shape) {
                case 'square':
                    ctx.rect(projX - finalSize, projY - finalSize, finalSize * 2, finalSize * 2);
                    break;
                case 'triangle':
                    ctx.moveTo(projX, projY - finalSize); // Top-center
                    ctx.lineTo(projX - finalSize, projY + finalSize); // Bottom-left
                    ctx.lineTo(projX + finalSize, projY + finalSize); // Bottom-right
                    ctx.closePath();
                    break;
                case 'circle':
                default:
                    ctx.arc(projX, projY, finalSize, 0, Math.PI * 2);
                    break;
            }
            ctx.fill();
        });
        ctx.restore();
        
    } catch (e) {
        console.error("Error in drawVectorBall:", e);
        if (ctx) ctx.restore();
    }
};
