import { CATEGORY_CONFIG, ProjectCategory } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Construction, Hospital, Landmark, GraduationCap, Droplets, Trees } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  road: <Construction className="h-3 w-3" />,
  hospital: <Hospital className="h-3 w-3" />,
  bridge: <Landmark className="h-3 w-3" />,
  school: <GraduationCap className="h-3 w-3" />,
  drainage: <Droplets className="h-3 w-3" />,
  park: <Trees className="h-3 w-3" />,
};

export function CategoryChip({ category, className }: { category: ProjectCategory; className?: string }) {
  const config = CATEGORY_CONFIG[category];
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', config.bgClass, config.textClass, className)}>
      {CATEGORY_ICONS[category]} {config.label.split(' ')[0]}
    </span>
  );
}
