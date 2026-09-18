
import type { DrawFunction } from '@/lib/types';
import { hexToRgb } from './helpers';

export const drawSolidCubes: DrawFunction = ({ ctx, freqData, width, height, config }) => {
    try {
        const { size = 25, offsetX = 0, offsetY = 0, seed = 0, count = 'multiple', style = 'solid' } = config.solidCubesConfig || {};
        const color = config.colors?.['solid-cubes']?.[0] || '#ff3333';
        const rgb = hexToRgb(color);
        if (!rgb) return;

        const bass = freqData.slice(0, 5).reduce((a, b) => a + b, 0) / 5 / 255;
        
        const numCubes = count === 'single' ? 1 : 6;

        // Re-initialize if seed or count changes
        if (!(ctx as any).__solidCubes || (ctx as any).__solidCubesSeed !== seed || (ctx as any).__solidCubesCount !== numCubes) {
            (ctx as any).__solidCubesSeed = seed;
            (ctx as any).__solidCubesCount = numCubes;
            (ctx as any).__solidCubes = Array.from({ length: numCubes }, () => ({
                 pos: { 
                    x: (Math.random() - 0.5) * width * (numCubes === 1 ? 0 : 0.7), // Center single cube
                    y: (Math.random() - 0.5) * height * (numCubes === 1 ? 0 : 0.7), // Center single cube
                    z: Math.random() * 400 - 200 
                },
                rot: { x: Math.random() * Math.PI, y: Math.random() * Math.PI, z: Math.random() * Math.PI },
                vel: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 },
            }));
        }

        const cubes: any[] = (ctx as any).__solidCubes;
        cubes.sort((a, b) => b.pos.z - a.pos.z); // Z-sorting

        const overallCenterX = width / 2 + (width * offsetX / 100);
        const overallCenterY = height / 2 + (height * offsetY / 100);

        const vertices = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];
        const faces = [
            [0, 1, 2, 3], [4, 7, 6, 5], [0, 3, 7, 4],
            [1, 5, 6, 2], [0, 4, 5, 1], [3, 2, 6, 7]
        ];
        const normals = [
            [0, 0, -1], [0, 0, 1], [-1, 0, 0],
            [1, 0, 0], [0, -1, 0], [0, 1, 0]
        ];

        cubes.forEach(cube => {
            const rotSpeed = 1 + bass * 2;
            cube.rot.x += cube.vel.x * rotSpeed;
            cube.rot.y += cube.vel.y * rotSpeed;

            const finalSize = size * (1 + bass * 0.3);

            const transformedVertices = vertices.map(v => {
                let [x, y, z] = v;
                // Y rotation
                [x, z] = [x * Math.cos(cube.rot.y) - z * Math.sin(cube.rot.y), x * Math.sin(cube.rot.y) + z * Math.cos(cube.rot.y)];
                // X rotation
                [y, z] = [y * Math.cos(cube.rot.x) - z * Math.sin(cube.rot.x), y * Math.sin(cube.rot.x) + z * Math.cos(cube.rot.x)];
                
                z += cube.pos.z;
                const scale = 300 / (300 + z);

                return {
                    x: (x * finalSize + cube.pos.x) * scale + overallCenterX,
                    y: (y * finalSize + cube.pos.y) * scale + overallCenterY,
                    z: z
                };
            });

            const transformedNormals = normals.map(n => {
                let [x, y, z] = n;
                 // Y rotation
                [x, z] = [x * Math.cos(cube.rot.y) - z * Math.sin(cube.rot.y), x * Math.sin(cube.rot.y) + z * Math.cos(cube.rot.y)];
                // X rotation
                [y, z] = [y * Math.cos(cube.rot.x) - z * Math.sin(cube.rot.x), y * Math.sin(cube.rot.x) + z * Math.cos(cube.rot.x)];
                return {x, y, z};
            });


            const facesToDraw = [];
            for (let i = 0; i < faces.length; i++) {
                if (transformedNormals[i].z < 0) { // Back-face culling
                    facesToDraw.push({
                        face: faces[i],
                        normalZ: transformedNormals[i].z
                    });
                }
            }

            facesToDraw.forEach(({ face, normalZ }) => {
                ctx.beginPath();
                ctx.moveTo(transformedVertices[face[0]].x, transformedVertices[face[0]].y);
                ctx.lineTo(transformedVertices[face[1]].x, transformedVertices[face[1]].y);
                ctx.lineTo(transformedVertices[face[2]].x, transformedVertices[face[2]].y);
                ctx.lineTo(transformedVertices[face[3]].x, transformedVertices[face[3]].y);
                ctx.closePath();

                if (style === 'solid') {
                    const light = Math.abs(normalZ);
                    const brightness = 0.4 + 0.6 * light;

                    ctx.fillStyle = `rgba(${rgb.r * brightness}, ${rgb.g * brightness}, ${rgb.b * brightness}, 1)`;
                    ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
                    ctx.lineWidth = 1;
                    ctx.fill();
                    ctx.stroke();
                } else { // wireframe
                    ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }
            });
        });

    } catch (e) {
        console.error("Error in drawSolidCubes:", e);
    }
};
