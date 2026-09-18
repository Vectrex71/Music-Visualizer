import Link from 'next/link';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Sparkles, ArrowLeft, Headphones, Monitor, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Guides & Tutorials - Music Visualizer Knowledge Base',
  description: 'In-depth guides on audio-reactive music visualization, Web Audio API FFT analysis, demoscene aesthetics, and video production for independent artists.',
};

export default function GuidesPage() {
  const articles = [
    {
      id: 'audio-reactive-fft',
      title: 'The Ultimate Guide to Audio-Reactive Music Visualization',
      category: 'Audio Engineering & FFT',
      readTime: '8 min read',
      date: 'August 2026',
      summary: 'Discover how Fast Fourier Transform (FFT) algorithms translate raw sound waves into vibrant, frequency-synced graphical animations in real time.',
      content: `
        Music visualization is the art of translating auditory frequencies into visual art. At the core of modern browser-based visualizers is the Web Audio API and the Fast Fourier Transform (FFT) analysis node. 
        
        ### How FFT Works in Audio Visualizers
        When audio plays through your browser, the audio stream is captured and analyzed frame-by-frame. The FFT algorithm breaks down complex sound waves into individual frequency bins. 
        - **Bass Frequencies (20 Hz - 250 Hz):** Typically drive the punchy scale transformations, shockwaves, and background pulsations.
        - **Midrange Frequencies (250 Hz - 4,000 Hz):** Control melodic waveform curves, particle emitters, and spectral bars.
        - **Treble Frequencies (4,000 Hz - 20,000 Hz):** Sparkle effects, starfields, glitch bursts, and high-frequency sparks.

        By mapping these frequency bands to canvas rendering parameters, creators can achieve mesmerizing synchronization without manual keyframing.
      `
    },
    {
      id: 'demoscene-aesthetics',
      title: 'Demoscene Traditions and Modern Browser Post-Processing',
      category: 'Digital Art & Retro Computing',
      readTime: '6 min read',
      date: 'August 2026',
      summary: 'Exploring how classic 1980s and 90s demoscene visual tricks like copper bars, vector balls, and CRT scanlines inspire modern web graphics.',
      content: `
        The demoscene is a computer art subculture that specializes in producing audiovisual presentations generated in real-time on computer hardware. Today, HTML5 Canvas and WebGL allow us to bring these classic retro-futuristic aesthetics directly to the browser.
        
        ### Iconic Visual Elements
        - **Copper Bars:** Horizontal color gradients oscillating smoothly across the screen, reminiscent of Amiga copper hardware tricks.
        - **Vector Wireframe Spheres:** 3D rotational math rendered with crisp vector lines.
        - **CRT Scanlines & VHS Noise:** Adding analog warmth, chromatic aberration, and simulated tape jitter to clean digital vectors.
        
        Combining demoscene shaders with modern music creates an unmatched nostalgic atmosphere for synthwave, electronic music, and ambient soundscapes.
      `
    },
    {
      id: 'independent-music-videos',
      title: 'How Independent Artists Can Create Professional Music Videos on a Budget',
      category: 'Music Production & Marketing',
      readTime: '7 min read',
      date: 'August 2026',
      summary: 'A step-by-step workflow for DJs, electronic producers, and bands to generate captivating YouTube and TikTok visualizers effortlessly.',
      content: `
        Creating compelling visual content for SoundCloud, YouTube, and Instagram is essential for modern music promotion. Historically, editing high-end 1080p music videos required expensive software like After Effects and powerful rendering rigs.
        
        ### The Browser-Based Revolution
        With modern web-based tools like Music Visualizer, artists can upload their audio track, customize generative backgrounds and dynamic audio-reactive layers, add custom band logos, and render stunning music videos directly in their browser without installing heavy software.
        
        ### Tips for Higher Engagement
        1. Match your visual color palette to your album artwork.
        2. Keep motion speeds balanced so viewers do not experience visual fatigue.
        3. Export in crisp 1080p and pair with dynamic waveform spectrums.
      `
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header page="landing" />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <Badge className="mb-2 bg-primary/20 text-primary border-primary/30">
            <BookOpen className="w-4 h-4 mr-1 inline-block" /> Knowledge Base & Editorial
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl font-headline">
            Guides, Tutorials & Articles
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            In-depth articles and tutorials on audio reactivity, the Web Audio API, demoscene aesthetics, and digital music video production.
          </p>
        </div>

        <div className="grid gap-8 mt-10">
          {articles.map((article) => (
            <Card key={article.id} className="border border-border bg-card/50 overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <span>{article.readTime} • {article.date}</span>
                </div>
                <CardTitle className="text-2xl font-bold">{article.title}</CardTitle>
                <CardDescription className="text-base mt-2">{article.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none text-foreground/95 leading-relaxed space-y-4">
                  {article.content.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('###')) {
                      return <h3 key={idx} className="text-xl font-semibold text-primary mt-6 mb-3">{paragraph.replace('###', '').trim()}</h3>;
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <ul key={idx} className="list-disc pl-6 space-y-2">
                          {paragraph.split('\n').map((li, i) => (
                            <li key={i}>{li.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Music Visualizer. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <Link href="/guides" className="hover:underline">Guides</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
