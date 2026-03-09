import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Calendar, IndianRupee, Users, ArrowRight, X, Sparkles, User, Target, Clock, Star, Construction, Hospital, Landmark, GraduationCap, Droplets, Trees, CheckCircle2, RefreshCw } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryChip } from '@/components/shared/CategoryChip';
import { StarRating } from '@/components/shared/StarRating';
import { Button } from '@/components/ui/button';
import { PROJECTS, SCHEMES, DEMO_PROFILES, ProfileType, CATEGORY_CONFIG } from '@/data/mockData';
import { formatCurrency, formatNumber } from '@/lib/formatters';

export default function CitizenHome() {
  const { profile, profileType, setProfileType } = useApp();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const relevantSchemes = SCHEMES.filter((s) => s.targetAudience.includes(profileType));

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 6000);
  };

  const updates = [
    { icon: 'completed' as const, text: 'Rohini Sector 7 Road — COMPLETED', time: '2 days ago', status: 'completed' as const },
    { icon: 'ongoing' as const, text: 'Yamuna Riverfront Phase 1 — ONGOING (67%)', time: '1 week ago', status: 'ongoing' as const },
    { icon: 'completed' as const, text: 'Solar Schools Initiative — COMPLETED', time: '2 weeks ago', status: 'completed' as const },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <AppHeader activeTab="home" />

      {/* Demo Notification Banner */}
      {showNotification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md animate-slide-down">
          <div className="bg-card rounded-xl shadow-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-secondary" />
                <span className="font-semibold text-sm text-foreground">NagraDarshan</span>
              </div>
              <button onClick={() => setShowNotification(false)} className="text-muted-foreground hover:text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-1.5">A new project near you has been completed!</p>
            <p className="font-medium text-foreground text-sm">Rohini Flyover Phase 2</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
              <IndianRupee className="h-3 w-3" /> 12 Crore
              <Users className="h-3 w-3 ml-2" /> 50,000 beneficiaries
            </p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" className="h-9 text-xs" onClick={() => navigate('/citizen/project/3')}>View Project</Button>
              <Button size="sm" variant="outline" className="h-9 text-xs">PM-KISAN Apply</Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Top Section: Profile + Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8">
          {/* Profile Strip */}
          <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl p-4 sm:p-5 text-primary-foreground">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs opacity-75">Welcome back!</p>
                <p className="font-bold text-lg sm:text-xl truncate">{profile.name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="bg-white/15 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs">{profile.occupationLabel}</span>
                  <span className="text-[10px] sm:text-xs opacity-75 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {profile.ward}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Switcher */}
          <div className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border">
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 font-medium">Demo Profile:</p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(DEMO_PROFILES) as ProfileType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setProfileType(type)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all min-h-[36px] ${profileType === type ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                  {DEMO_PROFILES[type].occupationLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Near You */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h2 className="font-bold text-foreground text-base sm:text-lg">Projects Near You</h2>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Projects within 2km of your location</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/citizen/nearby')} className="gap-1 text-xs h-9 min-h-[44px]">
              View All <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PROJECTS.filter(p => !['pending_l1', 'pending_l2', 'rejected'].includes(p.status)).slice(0, 4).map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/citizen/project/${project.id}`)}
                className="bg-card rounded-xl card-shadow border border-border p-3 sm:p-4 cursor-pointer hover:-translate-y-0.5 hover:card-shadow-hover transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <CategoryChip category={project.category} />
                  <StatusBadge status={project.status} />
                </div>
                <div className="h-20 sm:h-24 rounded-lg mb-2.5 sm:mb-3 flex items-center justify-center" style={{ backgroundColor: CATEGORY_CONFIG[project.category].color + '10' }}>
                  <CategoryIcon category={project.category} className="h-8 w-8 sm:h-10 sm:w-10 opacity-40" style={{ color: CATEGORY_CONFIG[project.category].color }} />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1.5 line-clamp-2 leading-snug">{project.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{project.ward}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-border pt-2.5">
                  <span className="font-medium text-foreground">
                    {formatCurrency(project.cost)}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" /> {formatNumber(project.beneficiaries)}
                  </span>
                </div>
                <div className="mt-2">
                  <StarRating rating={project.rating} count={project.ratingCount} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schemes For You */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h2 className="font-bold text-foreground text-base sm:text-lg">Schemes For You</h2>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">AI-powered recommendations</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/citizen/schemes')} className="gap-1 text-xs h-9 min-h-[44px]">
              View All <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relevantSchemes.slice(0, 3).map((scheme) => (
              <div key={scheme.id} className="bg-card rounded-xl p-4 card-shadow border border-border relative overflow-hidden hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                <span className="absolute top-3 right-3 bg-purple/10 text-purple text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI
                </span>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug pr-10">{scheme.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{scheme.description}</p>
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <span className="font-semibold text-accent">
                    {scheme.benefit}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {scheme.deadline}
                  </span>
                </div>
                <div className="mt-auto pt-1">
                  <Button size="sm" className="w-full h-10 text-xs gradient-saffron border-0 text-primary-foreground gap-1 min-h-[44px]">
                    Apply Now <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {/* Recent Updates */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-foreground text-base sm:text-lg mb-3 sm:mb-4">Recent Updates</h2>
            <div className="space-y-2.5">
              {updates.map((update, i) => (
                <div key={i} className="flex items-center gap-3 p-3 sm:p-3.5 bg-card rounded-xl border border-border card-shadow hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: update.status === 'completed' ? 'hsl(var(--accent) / 0.1)' : 'hsl(var(--secondary) / 0.1)' }}>
                    <StatusIcon status={update.status} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-foreground leading-snug truncate">{update.text}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h2 className="font-bold text-foreground text-base sm:text-lg mb-3 sm:mb-4">Your Activity</h2>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2.5">
              <div className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border text-center lg:text-left lg:flex lg:items-center lg:gap-3">
                <div className="flex justify-center lg:justify-start mb-1.5 lg:mb-0">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{profile.notificationsReceived}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Notifications</div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border text-center lg:text-left lg:flex lg:items-center lg:gap-3">
                <div className="flex justify-center lg:justify-start mb-1.5 lg:mb-0">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Star className="h-4 w-4 text-secondary" />
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{profile.projectsRated}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Rated</div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border text-center lg:text-left lg:flex lg:items-center lg:gap-3">
                <div className="flex justify-center lg:justify-start mb-1.5 lg:mb-0">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Target className="h-4 w-4 text-accent" />
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{profile.schemesApplied}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Applied</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Notification FAB — bottom-center on mobile, bottom-right on desktop */}
      <button
        onClick={triggerNotification}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-5 md:right-5 md:left-auto md:translate-x-0 z-40 gradient-saffron text-primary-foreground px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-xs font-medium flex items-center gap-1.5 min-h-[44px]"
      >
        <MapPin className="h-4 w-4" /> Demo Notification
      </button>

      <Footer />
    </div>
  );
}

function CategoryIcon({ category, className, style }: { category: string; className?: string; style?: React.CSSProperties }) {
  const icons: Record<string, React.ReactNode> = {
    road: <Construction className={className} style={style} />,
    hospital: <Hospital className={className} style={style} />,
    bridge: <Landmark className={className} style={style} />,
    school: <GraduationCap className={className} style={style} />,
    drainage: <Droplets className={className} style={style} />,
    park: <Trees className={className} style={style} />,
  };
  return <>{icons[category] || <Construction className={className} style={style} />}</>;
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'completed') return <CheckCircle2 className="h-4 w-4 text-accent" />;
  if (status === 'ongoing') return <RefreshCw className="h-4 w-4 text-warning" />;
  return <Construction className="h-4 w-4 text-primary" />;
}
