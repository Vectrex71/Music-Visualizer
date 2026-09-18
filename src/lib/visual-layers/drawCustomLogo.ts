
import type { DrawFunction } from '@/lib/types';

export const drawCustomLogo: DrawFunction = ({ ctx, width, height, config, customLogoElement }) => {
    if (!customLogoElement || !customLogoElement.src || customLogoElement.naturalWidth === 0 || !config.logoConfig) return;
    try {
        const { logoConfig } = config;
        const logoWidth = width * (logoConfig.size / 100);
        const aspectRatio = customLogoElement.naturalHeight / customLogoElement.naturalWidth;
        const logoHeight = logoWidth * aspectRatio;

        const x = width * (logoConfig.x / 100) - logoWidth / 2;
        const y = height * (logoConfig.y / 100) - logoHeight / 2;

        ctx.drawImage(customLogoElement, x, y, logoWidth, logoHeight);
    } catch (e) {
        console.error("Error in drawCustomLogo:", e);
    }
};
