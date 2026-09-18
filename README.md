# 🎵 Music Visualizer

> A high-performance, browser-based audio-reactive music visualizer studio inspired by modern generative art and the retro demoscene.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-API-orange?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

**Music Visualizer** enables artists, DJs, beatmakers, and video creators to generate stunning audio-reactive videos directly inside their web browser—without watermarks, subscriptions, or cloud uploads.

---

## ✨ Features

- **⚡ Real-Time Web Audio Engine**: Instant frequency and time-domain analysis powered by the native Web Audio API (`AnalyserNode`).
- **🎛️ Multi-Layer Compositing**: Stack and arrange multiple visualizer layers, background generators, and post-processing filters simultaneously.
- **📼 Retro Demoscene & Synthwave FX**: Authentic demoscene effects including Amiga-style Copperbars, 3D Glenz Vectors, Boids flocking, Hypnotic Tunnels, Solid Cubes, Lissajous curves, and Matrix rain.
- **🎨 Custom Media Support**: Import your own background images, looping videos, logos, watermarks, and animated sprite sheets.
- **📐 Flexible Aspect Ratios**:
  - `16:9` Widescreen (YouTube, Twitch, Desktop)
  - `9:16` Vertical (TikTok, Instagram Reels, YouTube Shorts)
  - `1:1` Square (Instagram feed, album artwork)
- **📹 Direct In-Browser Video Export**: Render smooth, frame-accurate WebM video exports locally at up to 1080p resolution.
- **💾 Project Manager**: Save, load, and manage your visualizer configurations locally in your browser.
- **🔒 100% Private & Free**: Audio and visual processing runs entirely on client-side memory—no tracks or assets are ever uploaded to a remote server.

---

## 🎨 Visualizer Layers & Effects

| Category | Available Effects |
| :--- | :--- |
| **Audio-Reactive** | Waveform, Spectrum Bars, Radial/Circular Spectrum, Pulsing Orbs, Particle Bursts, Spirograph, Wave Circle, Reactive Text, Vector Ball, Poly Sphere |
| **Demoscene & 3D** | Copperbars, Solid Cubes, Star Lines (Glenz Vectors), Checkerboard, 3D Torus, Boids Simulation, Hypnotic Tunnel, Matrix Rain, Lissajous, Greets Scroller, Flower of Life |
| **Backgrounds** | Neon Synthwave Grid, Deep Starfield (custom directions & shapes), Plasma Orbs, Phyllotaxis Spiral |
| **Post-FX Overlays** | CRT Glitch, VHS Noise & Tracking, Scanlines, Film Grain, Water Ripples, Vignette, Strobe, LED Matrix |
| **Custom Assets** | Custom Background Image, Custom Video Loop, Custom Logo Overlay, Sprite Sheet Animations |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** 18.18+ or 20+
- **npm**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/music-visualizer.git
   cd music-visualizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI & Components**: [React 19](https://react.dev/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), `tailwindcss-animate`
- **Audio Processing**: Native HTML5 Web Audio API
- **Rendering & Video**: HTML5 Canvas 2D / WebGL & `MediaRecorder` API
- **Language**: TypeScript

---

## 📁 Project Structure

```text
├── public/                 # Static assets (fonts, icons, presets)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Landing & showcase page
│   │   ├── creator/        # Core Visualizer Studio interface
│   │   ├── guides/         # User tutorials & guides
│   │   └── faq/            # Frequently Asked Questions
│   ├── components/
│   │   ├── synth/          # Visual preview, layer selector & render engine
│   │   ├── layout/         # Header, navigation, and layout containers
│   │   └── ui/             # Radix + Tailwind UI components
│   └── lib/
│       ├── config.ts       # Visualizer presets, layer definitions & defaults
│       ├── types.ts        # TypeScript interfaces and effect config types
│       └── utils.ts        # Utility and class helper functions
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🤝 Contributing

Contributions, feature suggestions, and bug reports are warmly welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
