'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MobileNav } from '@/components/ui/mobile-nav';
import { Logo } from '@/components/ui/logo';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Frameworks', href: '#frameworks' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wide flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Logo />
          <nav className="hidden items-center space-x-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Desktop Auth */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            {isMobileNavOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        navigation={navigation}
      />
    </header>
  );
}
