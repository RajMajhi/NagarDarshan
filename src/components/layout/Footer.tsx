import { forwardRef } from 'react';
import { Heart } from 'lucide-react';

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer ref={ref} className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 py-5 text-center">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 flex-wrap">
          Built for <span className="font-semibold text-foreground">India Innovates 2026</span> | MCD Delhi | Made with <Heart className="h-3 w-3 text-destructive fill-destructive" /> in India
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
