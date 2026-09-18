'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/header';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {

  const features = [
    { id: 'neon-grid', name: 'Generative Backgrounds', description: 'From retro grids and starfields to hypnotic tunnels and plasma orbs. Set the perfect scene for your sound.' },
    { id: 'circular-spectrum', name: 'Audio-Reactive Visualizers', description: 'Watch your music take shape with classic waveforms, spectrum bars, pulsing shapes, and particle bursts.' },
    { id: 'copper-bars', name: 'Demoscene & Post-FX', description: 'Add a final touch of style with classic demoscene effects like copper bars and custom overlays like VHS noise.' },
  ];
  
  const unlockedFeatures = [
    "Create as many visualizers as you want (no limits!)",
    "Get 3 save-slots to save your individual templates.",
    "Upload your own logos, backgrounds, videos, and images.",
    "Render videos without a watermark.",
    "1080p Full HD Export",
    "Access to all visual layers & audio-reactive effects",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header page="landing" />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          <video 
            src="/visualizerbanner.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/visualizer.gif"
          />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-20">
            <Badge className="mb-4 px-4 py-1 text-sm bg-primary/20 text-primary border-primary/30">
              <Sparkles className="w-4 h-4 mr-1 inline-block" /> 100% Free & Unlimited
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
              Create Stunning Music Visualizations
            </h1>
            <p className="max-w-[700px] mx-auto text-foreground/80 md:text-xl mt-6">
              Bring your audio to life. Combine generative backgrounds, audio-reactive visualizers, and demoscene-style effects into unique video creations — completely free.
            </p>
            <div className="mt-12 flex justify-center items-center gap-6">
              <Button asChild size="lg">
                <Link href="/creator">
                  Start Creating Now <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <img
            src="/entertainerlogo.png"
            alt="The Entertainer Logo"
            className="absolute bottom-4 left-4 z-20 w-48 h-auto pointer-events-none"
          />
          <img
            src="/entertainerroboter.png"
            alt="The Entertainer Roboter"
            className="absolute bottom-0 -right-32 z-10 w-[450px] h-auto transform -scale-x-100 pointer-events-none"
          />
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
              Powerful Features at Your Fingertips
            </h2>
            <p className="max-w-[700px] mx-auto text-center text-muted-foreground md:text-lg mt-4">
              Mix and match layers to build your unique visual experience.
            </p>
            <div className="grid gap-8 md:grid-cols-3 mt-12">
              {features.map((feature) => (
                <div key={feature.id} className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 border border-border bg-black/20">
                    {feature.id === 'neon-grid' ? (
                      <img
                        src="/backgrounds.gif"
                        alt="Generative Backgrounds Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : feature.id === 'circular-spectrum' ? (
                      <img
                        src="/visualizer.gif"
                        alt="Audio-Reactive Visualizers Preview"
                        className="w-full h-full object-cover scale-[1.05]"
                      />
                    ) : (
                      <video
                        src={feature.id === 'copper-bars' ? "/build.mp4" : `/${feature.id}.mp4`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{feature.name}</h3>
                  <p className="text-muted-foreground mt-2">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Unlocked Features & Donation Section */}
        <section id="free-access" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="mb-3 px-3 py-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                100% Free Tool
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                All Features Completely Free & Unlocked
              </h2>
              <p className="text-muted-foreground md:text-lg mt-4">
                No paywalls, subscriptions, or hidden limits. Enjoy full studio capabilities without restrictions.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* Features Card */}
              <Card className="flex flex-col border-primary/30 bg-card/60">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Included Features
                  </CardTitle>
                  <CardDescription>Everything available for every user immediately</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3.5 text-foreground/90">
                    {unlockedFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="text-primary w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button size="lg" className="w-full text-lg" asChild>
                    <Link href="/creator">
                      Start Creating Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section 
          className="relative w-full py-12 md:py-24 lg:py-32 bg-center bg-cover"
          style={{backgroundImage: "url('/guiscreen.png')"}}
        >
          <div className="absolute inset-0 bg-background/80 z-10" />
          <div className="container relative z-20 mx-auto text-center px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Visualize Your Sound?</h2>
            <p className="max-w-md mx-auto text-muted-foreground mt-4">
              No complex software or subscription needed. Your browser is your studio.
            </p>
            <div className="mt-6">
              <Button asChild size="lg">
                <Link href="/creator">
                  Get Started Completely Free <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto py-6 px-4 md:px-6 flex justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2026 Music Visualizer V0.9</p>
          <p>
            Created by{' '}
            <a 
              href="https://hj-wuethrich.cv" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-primary transition-colors"
            >
              HJ.Wuethrich
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

