import { AdminLayout } from '@/components/layout/AdminLayout';
import { PROJECTS, WARD_HEATMAP } from '@/data/mockData';
import { formatNumber } from '@/lib/formatters';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Star } from 'lucide-react';

const notifVolume = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  value: Math.floor(800 + Math.random() * 1500),
}));

const topProjects = [...PROJECTS].sort((a, b) => b.reach - a.reach).slice(0, 7).map((p) => ({
  name: p.title.length > 25 ? p.title.slice(0, 25) + '…' : p.title,
  reach: p.reach,
}));

const ratingDist = [
  { stars: '1★', count: 45 },
  { stars: '2★', count: 89 },
  { stars: '3★', count: 234 },
  { stars: '4★', count: 567 },
  { stars: '5★', count: 412 },
];

const wardPerf = WARD_HEATMAP.sort((a, b) => b.value - a.value).slice(0, 10).map((w) => ({
  ...w, projects: Math.floor(3 + Math.random() * 15), notifSent: Math.floor(500 + Math.random() * 3000),
  avgRating: (3.5 + Math.random() * 1.5).toFixed(1), schemeClicks: Math.floor(20 + Math.random() * 200),
}));

export default function Analytics() {
  return (
    <AdminLayout title="Analytics" subtitle="Performance metrics and insights">
      {/* Notification Volume */}
      <div className="bg-card rounded-2xl border border-border p-3 sm:p-6 card-shadow mb-4 sm:mb-6">
        <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Notification Volume — Last 30 Days</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={notifVolume}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,18%,90%)" />
            <XAxis dataKey="day" tick={{ fontSize: 9 }} interval={4} />
            <YAxis tick={{ fontSize: 9 }} />
            <Tooltip />
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(221,65%,50%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(221,65%,50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="hsl(221,65%,50%)" fill="url(#blueGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-card rounded-2xl border border-border p-3 sm:p-6 card-shadow">
          <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Top Projects by Reach</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topProjects} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,18%,90%)" />
              <XAxis type="number" tick={{ fontSize: 9 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} width={90} />
              <Tooltip />
              <Bar dataKey="reach" fill="hsl(20,85%,55%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-2xl border border-border p-3 sm:p-6 card-shadow">
          <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ratingDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,18%,90%)" />
              <XAxis dataKey="stars" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(40,85%,52%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metric Cards — 2x2 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 card-shadow text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Best Performing Ward</p>
          <p className="text-lg sm:text-xl font-bold text-foreground">Connaught Place</p>
          <p className="text-xs sm:text-sm text-accent font-medium">2,847 reaches</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 card-shadow text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Most Clicked Scheme</p>
          <p className="text-lg sm:text-xl font-bold text-foreground">PM-KISAN</p>
          <p className="text-xs sm:text-sm text-secondary font-medium">432 clicks</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 card-shadow text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Avg Time to Click</p>
          <p className="text-lg sm:text-xl font-bold text-foreground">2.3 min</p>
          <p className="text-xs sm:text-sm text-primary font-medium">↓ 18% improvement</p>
        </div>
      </div>

      {/* Ward Table — horizontally scrollable with sticky first col */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow">
        <h3 className="font-semibold text-foreground text-sm sm:text-base p-3 sm:p-6 pb-2 sm:pb-3">Ward Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground sticky left-0 bg-muted/30 z-10">Ward</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Projects</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Notif.</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Rating</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {wardPerf.map((w) => (
                <tr key={w.name} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="p-2 sm:p-3 font-medium text-foreground sticky left-0 bg-card z-10">{w.name}</td>
                  <td className="p-2 sm:p-3 text-muted-foreground">{w.projects}</td>
                  <td className="p-2 sm:p-3 text-muted-foreground">{formatNumber(w.notifSent)}</td>
                  <td className="p-2 sm:p-3 text-foreground flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" /> {w.avgRating}</td>
                  <td className="p-2 sm:p-3 text-muted-foreground">{w.schemeClicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
