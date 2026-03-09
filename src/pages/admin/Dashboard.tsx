import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryChip } from '@/components/shared/CategoryChip';
import { StarRating } from '@/components/shared/StarRating';
import { PROJECTS, WEEKLY_NOTIFICATIONS, CATEGORY_DISTRIBUTION, WARD_HEATMAP, CITIZEN_FEEDBACK } from '@/data/mockData';
import { formatCurrency } from '@/lib/formatters';
import { useCountUp } from '@/hooks/useCountUp';
import { Construction, Users, Star, FileText, SmilePlus, Meh, Frown, TrendingUp, BarChart3, Award, ClipboardList } from 'lucide-react';
import { ReactNode } from 'react';

function StatCard({ icon, value, sub, label }: { icon: ReactNode; value: number | string; sub: string; label: string }) {
  const numVal = typeof value === 'number' ? value : 0;
  const count = useCountUp(numVal);
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 card-shadow border border-border hover:-translate-y-0.5 hover:card-shadow-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted/60 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-none">
        {typeof value === 'number' ? count.toLocaleString('en-IN') : value}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground mt-1.5 font-medium">{label}</div>
      <div className="text-[10px] sm:text-xs font-semibold text-accent mt-1">{sub}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Overview of all government projects">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
        <StatCard icon={<Construction className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />} value={1247} sub="+23 this week" label="Total Projects" />
        <StatCard icon={<Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />} value={12847} sub="↑ 34% vs yesterday" label="Citizens Reached" />
        <StatCard icon={<Award className="h-5 w-5 sm:h-6 sm:w-6 text-warning" />} value="4.3" sub="8,234 ratings" label="Avg Rating" />
        <StatCard icon={<ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-purple" />} value={892} sub="Triggered this month" label="Scheme Apps" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-card rounded-2xl p-3 sm:p-5 card-shadow border border-border">
          <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Projects by Category</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={CATEGORY_DISTRIBUTION} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {CATEGORY_DISTRIBUTION.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 justify-center">
            {CATEGORY_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-[10px] sm:text-xs">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }} />
                <span className="text-muted-foreground">{item.name} {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-3 sm:p-5 card-shadow border border-border">
          <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Weekly Notifications</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_NOTIFICATIONS}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(221,65%,50%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Projects + Ward Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-card rounded-2xl p-3 sm:p-5 card-shadow border border-border">
          <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Recent Projects</h3>
          <div className="space-y-1">
            {PROJECTS.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-2 sm:p-3 rounded-xl hover:bg-muted/50 transition-colors gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="hidden sm:block"><CategoryChip category={project.category} /></div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-medium text-foreground truncate">{project.title}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{project.ward} · {formatCurrency(project.cost)}</div>
                  </div>
                </div>
                <StatusBadge status={project.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-3 sm:p-5 card-shadow border border-border">
          <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Top Performing Wards</h3>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2">
            {WARD_HEATMAP.map((ward) => (
              <div
                key={ward.name}
                className="aspect-square rounded-lg sm:rounded-xl flex items-center justify-center text-[8px] sm:text-[9px] font-medium text-primary-foreground cursor-default"
                style={{ backgroundColor: `hsl(221, 55%, ${Math.max(30, 68 - ward.value * 0.35)}%)` }}
                title={`${ward.name}: ${ward.value} notifications`}
              >
                <span className="truncate px-0.5">{ward.name.slice(0, 4)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citizen Feedback */}
      <div className="bg-card rounded-2xl p-3 sm:p-5 card-shadow border border-border">
        <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Recent Citizen Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {CITIZEN_FEEDBACK.map((fb) => (
            <div key={fb.id} className="p-3 sm:p-4 rounded-xl border border-border bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <StarRating rating={fb.rating} />
                {fb.sentiment === 'positive' ? <SmilePlus className="h-4 w-4 text-accent" /> :
                 fb.sentiment === 'neutral' ? <Meh className="h-4 w-4 text-warning" /> :
                 <Frown className="h-4 w-4 text-destructive" />}
              </div>
              <p className="text-xs sm:text-sm text-foreground mb-2 line-clamp-3">"{fb.comment}"</p>
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                <span>{fb.ward}</span>
                <span>{fb.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
