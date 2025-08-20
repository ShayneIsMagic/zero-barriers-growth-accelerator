'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden"
        >
          <div className="container-wide py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t pt-4">
                <div className="flex flex-col space-y-3">
                  <Link href="/login" onClick={onClose}>
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={onClose}>
                    <Button className="w-full justify-start">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
