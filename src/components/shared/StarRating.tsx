import { forwardRef, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  count?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating = forwardRef<HTMLDivElement, StarRatingProps>(
  ({ rating, count, interactive = false, onRate, size = 'sm' }, ref) => {
    const [hover, setHover] = useState(0);
    const sizeClass = size === 'lg' ? 'h-7 w-7' : size === 'md' ? 'h-5 w-5' : 'h-3.5 w-3.5';

    return (
      <div ref={ref} className="flex items-center gap-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              className={cn('transition-transform', interactive && 'hover:scale-110 cursor-pointer')}
              onMouseEnter={() => interactive && setHover(star)}
              onMouseLeave={() => interactive && setHover(0)}
              onClick={() => onRate?.(star)}
            >
              <Star
                className={cn(
                  sizeClass,
                  (hover || rating) >= star ? 'fill-warning text-warning' : 'text-muted'
                )}
              />
            </button>
          ))}
        </div>
        {rating > 0 && <span className="text-xs font-medium text-foreground">{rating.toFixed(1)}</span>}
        {count !== undefined && <span className="text-[10px] text-muted-foreground">({count})</span>}
      </div>
    );
  }
);

StarRating.displayName = 'StarRating';
