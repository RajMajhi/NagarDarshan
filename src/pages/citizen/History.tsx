import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';
import { StarRating } from '@/components/shared/StarRating';
import { Button } from '@/components/ui/button';
import { PROJECTS, SCHEMES } from '@/data/mockData';
import { Target, Bell, Eye, Star, FileText, CheckCircle2, Construction, Hospital, Landmark, GraduationCap, Droplets, Trees } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  road: <Construction className="h-4 w-4 text-primary" />,
  hospital: <Hospital className="h-4 w-4 text-destructive" />,
  bridge: <Landmark className="h-4 w-4 text-secondary" />,
  school: <GraduationCap className="h-4 w-4 text-accent" />,
  drainage: <Droplets className="h-4 w-4 text-primary" />,
  park: <Trees className="h-4 w-4 text-accent" />,
};

export default function History() {
  const { profile } = useApp();
  const navigate = useNavigate();

  const viewedProjects = PROJECTS.slice(0, 3);
  const appliedSchemes = SCHEMES.slice(0, 2);
  const receivedNotifs = [
    { project: PROJECTS[2].title, time: '2 hours ago', projectId: '3' },
    { project: PROJECTS[3].title, time: '1 day ago', projectId: '4' },
    { project: PROJECTS[4].title, time: '3 days ago', projectId: '5' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <AppHeader activeTab="history" />
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Impact Card */}
        <div className="gradient-primary rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 text-primary-foreground">
          <h2 className="font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" /> Your Impact
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { icon: <Eye className="h-4 w-4 mx-auto mb-1 opacity-75" />, value: profile.notificationsReceived, label: 'Projects Viewed' },
              { icon: <Star className="h-4 w-4 mx-auto mb-1 opacity-75" />, value: profile.projectsRated, label: 'Projects Rated' },
              { icon: <FileText className="h-4 w-4 mx-auto mb-1 opacity-75" />, value: 5, label: 'Schemes Explored' },
              { icon: <CheckCircle2 className="h-4 w-4 mx-auto mb-1 opacity-75" />, value: profile.schemesApplied, label: 'Schemes Applied' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 rounded-lg p-2.5 sm:p-3 text-center">
                {stat.icon}
                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                <div className="text-[9px] sm:text-[11px] opacity-75 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {/* Viewed Projects */}
          <div>
            <h2 className="font-bold text-foreground text-sm sm:text-base mb-2.5 sm:mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" /> Projects Viewed
            </h2>
            <div className="space-y-2 sm:space-y-2.5">
              {viewedProjects.map((p) => (
                <div key={p.id} className="bg-card rounded-xl border border-border p-3 sm:p-4 card-shadow hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      {CATEGORY_ICONS[p.category]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-xs sm:text-sm truncate">{p.title}</p>
                      <StarRating rating={p.rating} size="sm" />
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2.5 w-full text-xs h-9 min-h-[44px]" onClick={() => navigate(`/citizen/project/${p.id}`)}>View Again</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="font-bold text-foreground text-sm sm:text-base mb-2.5 sm:mb-3 flex items-center gap-2">
              <Bell className="h-4 w-4 text-secondary" /> Notifications
            </h2>
            <div className="space-y-2 sm:space-y-2.5">
              {receivedNotifs.map((n, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-3 sm:p-4 card-shadow hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-xs sm:text-sm truncate">{n.project}</p>
                      <p className="text-[10px] sm:text-[11px] text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="mt-2 w-full text-xs text-primary h-9 min-h-[44px]" onClick={() => navigate(`/citizen/project/${n.projectId}`)}>View Project →</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Applied Schemes */}
          <div>
            <h2 className="font-bold text-foreground text-sm sm:text-base mb-2.5 sm:mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" /> Schemes Applied
            </h2>
            <div className="space-y-2 sm:space-y-2.5">
              {appliedSchemes.map((s) => (
                <div key={s.id} className="bg-card rounded-xl border border-border p-3 sm:p-4 card-shadow hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-xs sm:text-sm">{s.name}</p>
                      <p className="text-[10px] sm:text-[11px] text-accent font-medium">{s.benefit}</p>
                    </div>
                    <span className="bg-accent/8 text-accent text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5 flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3" /> Applied
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
