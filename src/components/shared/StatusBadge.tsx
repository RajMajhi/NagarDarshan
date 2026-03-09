import { STATUS_CONFIG, ProjectStatus } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, RefreshCw, Clock, AlertCircle, ShieldCheck, Eye, XCircle } from 'lucide-react';

const STATUS_ICONS: Record<string, React.ReactNode> = {
  active: <Circle className="h-3 w-3" />,
  completed: <CheckCircle2 className="h-3 w-3" />,
  ongoing: <RefreshCw className="h-3 w-3" />,
  planning: <Clock className="h-3 w-3" />,
  pending_l1: <AlertCircle className="h-3 w-3" />,
  pending_l2: <ShieldCheck className="h-3 w-3" />,
  published: <Eye className="h-3 w-3" />,
  rejected: <XCircle className="h-3 w-3" />,
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border', config.className, className)}>
      {STATUS_ICONS[status]} {config.label}
    </span>
  );
}
