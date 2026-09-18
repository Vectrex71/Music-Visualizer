import Logo from '@/components/icons/logo';
import Link from 'next/link';

export default function Header({ 
  mobilePreview,
  page,
}: { 
  mobilePreview?: React.ReactNode,
  page?: 'landing' | 'creator',
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="text-xl font-bold tracking-wider text-foreground">
                Music Visualizer
              </h1>
               {page === 'creator' && (
                 <p className="text-sm text-muted-foreground">Compose your unique music visualization.</p>
               )}
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/guides" className="hidden sm:inline-block hover:text-foreground transition-colors">Guides & Articles</Link>
              <Link href="/faq" className="hidden sm:inline-block hover:text-foreground transition-colors">FAQ</Link>
              <Link href="/creator" className="hover:text-foreground transition-colors">Creator</Link>
            </nav>
          </div>
        </div>
      </div>
      {/* On mobile, the preview is rendered as part of the sticky header */}
      {mobilePreview && <div className="lg:hidden p-4 md:p-6">{mobilePreview}</div>}
    </header>
  );
}
