import { AdminLayout } from '@/components/layout/AdminLayout';
import { PROJECTS, DEMO_PROFILES, ProfileType } from '@/data/mockData';
import { Bell, Send, Eye, MousePointerClick } from 'lucide-react';

const CHANNELS = ['Push', 'WhatsApp', 'SMS'] as const;
const STATUSES = ['Delivered', 'Opened', 'Clicked'] as const;
const STATUS_ICONS = {
  Delivered: <Send className="h-3 w-3" />,
  Opened: <Eye className="h-3 w-3" />,
  Clicked: <MousePointerClick className="h-3 w-3" />,
};

const notifications = Array.from({ length: 20 }, (_, i) => {
  const profiles = Object.keys(DEMO_PROFILES) as ProfileType[];
  const profile = profiles[i % profiles.length];
  const project = PROJECTS[i % PROJECTS.length];
  const channel = CHANNELS[i % 3];
  const status = STATUSES[i % 3];
  const mins = [2, 5, 12, 30, 45, 60, 120, 180, 360, 720][i % 10];
  const timeAgo = mins < 60 ? `${mins} min ago` : mins < 1440 ? `${Math.floor(mins / 60)} hours ago` : `${Math.floor(mins / 1440)} days ago`;
  return { id: i, profile, project: project.title, channel, status, timeAgo };
});

export default function NotificationsLog() {
  return (
    <AdminLayout title="Notifications Log" subtitle="All notification delivery tracking">
      {/* Stats — 2x2 on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
        {[
          { label: 'Total Sent', value: '12,847', color: 'text-primary', icon: <Send className="h-4 w-4 text-primary" /> },
          { label: 'Delivery Rate', value: '98.2%', color: 'text-accent', icon: <Bell className="h-4 w-4 text-accent" /> },
          { label: 'Open Rate', value: '34.7%', color: 'text-secondary', icon: <Eye className="h-4 w-4 text-secondary" /> },
          { label: 'Click Rate', value: '18.3%', color: 'text-purple', icon: <MousePointerClick className="h-4 w-4 text-purple" /> },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl sm:rounded-2xl border border-border p-3 sm:p-5 card-shadow text-center">
            <div className="flex justify-center mb-1.5 sm:mb-2">{s.icon}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">{s.label}</p>
            <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-2 sm:space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="bg-card rounded-xl sm:rounded-2xl border border-border p-3 sm:p-4 card-shadow flex items-center gap-3 sm:gap-4 hover:bg-muted/10 transition-colors">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="bg-primary/8 text-primary text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full">
                  {DEMO_PROFILES[n.profile].occupationLabel}
                </span>
                <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${n.channel === 'Push' ? 'bg-accent/8 text-accent' : n.channel === 'WhatsApp' ? 'bg-accent/8 text-accent' : 'bg-muted text-muted-foreground'}`}>
                  {n.channel}
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground flex items-center gap-0.5 sm:gap-1">
                  {STATUS_ICONS[n.status]} {n.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground mt-0.5 sm:mt-1 truncate">{n.project}</p>
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">{n.timeAgo}</span>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
