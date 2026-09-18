
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawPolygonalSphere: DrawFunction = ({ ctx, frameCount, width, height, config, freqData }) => {
    if (!config.polygonalSphereConfig || !config.colors || !config.visualizerTransform) return;
    try {
        const { rotationSpeed, wireframe, shape, rainbow } = config.polygonalSphereConfig;
        const { size, rotation, offsetX, offsetY } = config.visualizerTransform;
        
        // --- Bass smoothing ---
        const bass = freqData.slice(0, 5).reduce((a, b) => a + b, 0) / 5 / 255;
        if ((ctx as any).__poly_smoothedBass === undefined) {
            (ctx as any).__poly_smoothedBass = 0;
        }
        let smoothedBass = (ctx as any).__poly_smoothedBass;
        smoothedBass += (bass - smoothedBass) * 0.1; // Easing
        (ctx as any).__poly_smoothedBass = smoothedBass;
        // --- End smoothing ---

        const color = config.colors['polygonal-sphere']?.[0] || '#00E0FF';

        const t = (1 + Math.sqrt(5)) / 2; // golden ratio
        const verticesData: {[key: string]: number[][]} = {
            icosahedron: [ [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1] ],
            octahedron: [ [1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1] ],
            dodecahedron: [
                [1, 1, 1], [-1, 1, 1], [-1, -1, 1], [1, -1, 1],
                [1, 1, -1], [-1, 1, -1], [-1, -1, -1], [1, -1, -1],
                [0, 1/t, t], [0, -1/t, t], [0, 1/t, -t], [0, -1/t, -t],
                [1/t, t, 0], [-1/t, t, 0], [1/t, -t, 0], [-1/t, -t, 0],
                [t, 0, 1/t], [-t, 0, 1/t], [t, 0, -1/t], [-t, 0, -1/t]
            ],
        };
        const facesData: {[key: string]: number[][]} = {
            icosahedron: [ [0,11,5], [0,5,1], [0,1,7], [0,7,10], [0,10,11], [1,5,9], [5,11,4], [11,10,2], [10,7,6], [7,1,8], [3,9,4], [3,4,2], [3,2,6], [3,6,8], [3,8,9], [4,9,5], [2,4,11], [6,2,10], [8,6,7], [9,8,1] ],
            octahedron: [ [0,2,4], [0,4,3], [0,3,5], [0,5,2], [1,2,5], [1,5,3], [1,3,4], [1,2,4] ],
            dodecahedron: [
                [0, 8, 1, 13, 12],
                [0, 12, 4, 18, 16],
                [0, 16, 3, 9, 8],
                [1, 8, 9, 2, 17],
                [1, 17, 19, 5, 13],
                [2, 9, 3, 14, 15],
                [2, 15, 6, 19, 17],
                [3, 16, 18, 7, 14],
                [4, 12, 13, 5, 10],
                [4, 10, 11, 7, 18],
                [5, 19, 6, 11, 10],
                [6, 15, 14, 7, 11]
            ],
        };
        
        const vertices = verticesData[shape] || verticesData.icosahedron;
        const faces = facesData[shape] || facesData.icosahedron;

        ctx.save();
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.translate(centerX + (width * offsetX / 100), centerY + (height * offsetY / 100));
        ctx.rotate(rotation * Math.PI / 180);
        const scale = size / 100;
        ctx.scale(scale, scale);

        const time = frameCount * 0.01 * (rotationSpeed + smoothedBass * 0.5);

        const rotatedPoints = vertices.map(p => {
            let [x, y, z] = p;
            [x, z] = [x * Math.cos(time) - z * Math.sin(time), x * Math.sin(time) + z * Math.cos(time)];
            [y, z] = [y * Math.cos(time * 0.5) - z * Math.sin(time * 0.5), y * Math.sin(time * 0.5) + z * Math.cos(time * 0.5)];
            return {x, y, z};
        });

        const sortedFaces = faces.map(face => {
            const avgZ = face.reduce((sum, i) => sum + rotatedPoints[i].z, 0) / face.length;
            return { face, avgZ };
        }).sort((a, b) => a.avgZ - b.avgZ);

        const rgb = hexToRgb(color);
        if(!rgb && !rainbow) { ctx.restore(); return; }

        const pulse = 1 + smoothedBass * 0.3; // Breathing effect
        const baseScale = Math.min(width, height) * 0.2 * pulse;
        const focalLength = Math.min(width, height) * 0.8;

        sortedFaces.forEach(({face, avgZ}) => {
            ctx.beginPath();
            face.forEach((pointIndex, i) => {
                const p = rotatedPoints[pointIndex];
                
                const perspective = focalLength / (focalLength - p.z * 50);
                
                const x = p.x * baseScale * perspective;
                const y = p.y * baseScale * perspective;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();

            const light = (avgZ / t + 1) / 2;
            const brightness = 0.4 + 0.6 * light;

            if (wireframe) {
                if (rainbow) {
                    const hue = (time * 50 + avgZ * 50) % 360;
                    ctx.strokeStyle = `hsl(${hue}, 80%, ${60 * brightness}%)`;
                } else {
                    ctx.strokeStyle = `rgba(${rgb!.r * brightness}, ${rgb!.g * brightness}, ${rgb!.b * brightness}, 0.8)`;
                }
                ctx.lineWidth = 1.5 + smoothedBass * 2;
                ctx.stroke();
            } else {
                 ctx.fillStyle = `rgba(${rgb!.r * brightness}, ${rgb!.g * brightness}, ${rgb!.b * brightness}, 0.7)`;
                 ctx.fill();
            }
        });
        ctx.restore();
    } catch(e) {
        console.error("Error in drawPolygonalSphere:", e);
        if(ctx) ctx.restore();
    }
};
