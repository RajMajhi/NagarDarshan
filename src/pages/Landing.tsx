import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCountUp } from '@/hooks/useCountUp';
import { useApp } from '@/contexts/AppContext';
import { TricolorBar } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';
import { CATEGORY_CONFIG, ProjectCategory } from '@/data/mockData';
import {
  Globe, Shield, User, MapPin, Bell, Sparkles, BarChart3,
  Construction, Hospital, Landmark, GraduationCap, Droplets, Trees,
  ArrowRight, ChevronRight, Eye, Zap, CheckCircle2, Star, Users, IndianRupee,
  Smartphone, Globe2, TrendingUp, Lock
} from 'lucide-react';

const LANGUAGES = [
  { code: 'en' as const, label: 'English' },
  { code: 'hi' as const, label: 'हिन्दी' },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  road: <Construction className="h-6 w-6" />,
  hospital: <Hospital className="h-6 w-6" />,
  bridge: <Landmark className="h-6 w-6" />,
  school: <GraduationCap className="h-6 w-6" />,
  drainage: <Droplets className="h-6 w-6" />,
  park: <Trees className="h-6 w-6" />,
};

/* ─── Scroll-triggered animation hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animated counter ─── */
function CountStat({ end, suffix, label, icon }: { end: number; suffix: string; label: string; icon: React.ReactNode }) {
  const count = useCountUp(end);
  return (
    <div className="flex flex-col items-center gap-2 p-4 sm:p-6">
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-secondary mb-1">
        {icon}
      </div>
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-foreground tracking-tight">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="text-[11px] sm:text-xs text-blue-200/70 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`group bg-card rounded-2xl p-5 sm:p-6 border border-border hover:border-primary/30 transition-all duration-500 card-shadow hover:card-shadow-hover hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-foreground text-sm sm:text-base mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Step card ─── */
function StepCard({ num, icon, title, desc, delay }: { num: number; icon: React.ReactNode; title: string; desc: string; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center text-center transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative mb-4 sm:mb-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-lg text-primary-foreground">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full gradient-saffron text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md border-2 border-card">
          {num}
        </div>
      </div>
      <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-[240px]">{desc}</p>
    </div>
  );
}

/* ─── Category card ─── */
function CategoryCard({ category, delay }: { category: ProjectCategory; delay: number }) {
  const config = CATEGORY_CONFIG[category];
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`group bg-card rounded-2xl p-4 sm:p-5 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-500 cursor-pointer border border-border hover:border-primary/20 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: config.color + '15', color: config.color }}>
        {CATEGORY_ICONS[category]}
      </div>
      <h3 className="font-semibold text-foreground text-sm mb-0.5">{config.label}</h3>
      <p className="text-[11px] text-muted-foreground">Track live projects</p>
    </div>
  );
}

/* ─── Testimonial card ─── */
function TestimonialCard({ name, role, text, delay }: { name: string; role: string; text: string; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl p-5 sm:p-6 border border-border card-shadow transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex gap-0.5 mb-3">
        {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />)}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-[11px] text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { setViewMode, language, setLanguage } = useApp();

  const goAdmin = () => { navigate('/admin/login'); };
  const goCitizen = () => { navigate('/citizen/login'); };

  const heroSection = useInView(0.1);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ─── Nav ─── */}
      <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="ashoka-chakra text-primary" />
            <div>
              <span className="font-extrabold text-base sm:text-lg text-foreground tracking-tight">NagraDarshan</span>
              <span className="hidden sm:inline text-[10px] text-muted-foreground ml-2 font-medium">by MCD Delhi</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
              <Globe className="h-3.5 w-3.5 text-muted-foreground ml-2" />
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all min-h-[36px] ${language === lang.code ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={goAdmin} className="text-xs h-9 px-2.5 sm:px-3 gap-1 min-h-[44px]">
              <Shield className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Admin</span>
            </Button>
            <Button size="sm" onClick={goCitizen} className="text-xs h-9 px-2.5 sm:px-4 gap-1 gradient-saffron border-0 text-primary-foreground min-h-[44px]">
              <User className="h-3.5 w-3.5" /> <span className="hidden xs:inline sm:inline">Citizen</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-10 left-[5%] w-48 sm:w-80 h-48 sm:h-80 bg-secondary/10 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-0 right-[5%] w-56 sm:w-96 h-56 sm:h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />

        {/* Geometric grid overlay */}
        <div className="absolute inset-0 geometric-pattern opacity-40" />

        <div
          ref={heroSection.ref}
          className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 lg:py-36 text-center relative z-10"
        >
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 sm:mb-8 border border-white/15 transition-all duration-700 ${heroSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-blue-200 tracking-wide">INDIA INNOVATES 2026 · MCD OFFICIAL PLATFORM</span>
          </div>

          {/* Headline */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary-foreground mb-5 sm:mb-6 leading-[1.1] transition-all duration-700 delay-100 ${heroSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            See What Your<br />
            <span className="bg-gradient-to-r from-secondary via-warning to-secondary bg-clip-text text-transparent">Government Built</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-blue-200/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${heroSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Track every government project near you in real-time. Know where your tax money goes.
            <span className="block mt-1 text-blue-200/60 text-xs sm:text-sm">Transparency for <strong className="text-primary-foreground">2 Crore+</strong> citizens across <strong className="text-primary-foreground">272 wards</strong></span>
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 mb-12 sm:mb-16 transition-all duration-700 delay-300 ${heroSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              size="lg"
              onClick={goCitizen}
              className="gradient-saffron text-primary-foreground border-0 hover:opacity-90 text-sm sm:text-base px-6 sm:px-10 h-12 sm:h-14 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.03] gap-2 font-semibold w-full sm:w-auto"
            >
              Explore Nearby Projects <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={goAdmin}
              className="border-white/20 text-primary-foreground bg-white/5 hover:bg-white/10 text-sm sm:text-base px-6 sm:px-10 h-12 sm:h-14 rounded-xl gap-2 font-semibold backdrop-blur-sm w-full sm:w-auto"
            >
              Admin Portal <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Stats counter row */}
          <div className={`grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 divide-x divide-white/10 transition-all duration-700 delay-400 ${heroSection.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <CountStat end={272} suffix="" label="Wards Covered" icon={<MapPin className="h-5 w-5" />} />
            <CountStat end={500} suffix="+" label="Projects Tracked" icon={<Construction className="h-5 w-5" />} />
            <CountStat end={2} suffix=" Cr+" label="Citizens Reached" icon={<Users className="h-5 w-5" />} />
            <CountStat end={0} suffix="" label="₹0 Cost" icon={<IndianRupee className="h-5 w-5" />} />
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-12">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════ LIVE STATS BAR ═══════════════════ */}
      <section className="bg-background py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <LiveStatCard icon={<Construction className="h-5 w-5" />} value="1,247" label="Active Projects" color="bg-primary/10 text-primary" delay={0} />
            <LiveStatCard icon={<Bell className="h-5 w-5" />} value="8.4 Lakh" label="Notifications Sent" color="bg-secondary/10 text-secondary" delay={100} />
            <LiveStatCard icon={<Star className="h-5 w-5" />} value="4.3/5" label="Citizen Rating" color="bg-warning/10 text-warning" delay={200} />
            <LiveStatCard icon={<IndianRupee className="h-5 w-5" />} value="12,400 Cr" label="Infrastructure Value" color="bg-accent/10 text-accent" delay={300} />
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="bg-background py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge="HOW IT WORKS" badgeColor="primary" title="Three Simple Steps" subtitle="From project creation to citizen notification — fully automated" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-10 max-w-4xl mx-auto relative">
            {/* Connector line (desktop) */}
            <div className="hidden sm:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30" />
            <StepCard delay={0} num={1} icon={<Construction className="h-8 w-8" />} title="Admin Adds Project" desc="Upload project with photos, location on map, and full impact details" />
            <StepCard delay={150} num={2} icon={<MapPin className="h-8 w-8" />} title="Geo-Fence Created" desc="System creates an invisible boundary around the project area automatically" />
            <StepCard delay={300} num={3} icon={<Bell className="h-8 w-8" />} title="Citizens Notified" desc="The right person gets the right information at the right time" />
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="bg-muted/30 py-12 sm:py-20 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge="PLATFORM FEATURES" badgeColor="accent" title="Why NagraDarshan?" subtitle="Built for transparency, designed for real impact" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <FeatureCard delay={0} icon={<MapPin className="h-6 w-6" />} title="Hyper-Local Tracking" desc="Know what's being built within 2km of your location, updated in real-time" />
            <FeatureCard delay={100} icon={<Bell className="h-6 w-6" />} title="Smart Notifications" desc="Get alerts only for projects that matter to you — no spam, no noise" />
            <FeatureCard delay={200} icon={<Sparkles className="h-6 w-6" />} title="AI Scheme Matching" desc="Personalized government scheme recommendations based on your profile" />
            <FeatureCard delay={300} icon={<Eye className="h-6 w-6" />} title="Before/After Impact" desc="Visual proof of transformation with interactive photo comparisons" />
          </div>

          {/* Secondary features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 max-w-5xl mx-auto">
            <MiniFeature icon={<Smartphone className="h-4 w-4" />} label="Mobile First" delay={0} />
            <MiniFeature icon={<Globe2 className="h-4 w-4" />} label="Hindi & English" delay={80} />
            <MiniFeature icon={<Lock className="h-4 w-4" />} label="Data Secure" delay={160} />
            <MiniFeature icon={<Zap className="h-4 w-4" />} label="Real-Time Updates" delay={240} />
          </div>
        </div>
      </section>

      {/* ═══════════════════ CATEGORIES ═══════════════════ */}
      <section className="bg-background py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge="PROJECT SECTORS" badgeColor="secondary" title="6 Key Sectors Tracked" subtitle="From roads to parks — every infrastructure category monitored" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {(Object.keys(CATEGORY_CONFIG) as ProjectCategory[]).map((cat, i) => (
              <CategoryCard key={cat} category={cat} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="bg-muted/20 py-12 sm:py-20 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader badge="CITIZEN VOICES" badgeColor="warning" title="What Citizens Say" subtitle="Real feedback from people using the platform" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <TestimonialCard delay={0} name="Ramesh Kumar" role="Farmer, Ward 47" text="Mujhe PM-KISAN ke baare mein yahan se pata chala. Apply kiya aur paisa aa gaya. Bahut acchi app hai!" />
            <TestimonialCard delay={100} name="Priya Sharma" role="Teacher, Ward 12" text="I can track the new school building near my house. The before/after photos are amazing — real transparency!" />
            <TestimonialCard delay={200} name="Mohammad Irfan" role="Shop Owner, Ward 89" text="Road construction near my shop — I got notified before it started. Planned my deliveries accordingly. Very useful!" />
          </div>
        </div>
      </section>

      {/* ═══════════════════ IMPACT NUMBERS ═══════════════════ */}
      <section className="gradient-hero relative overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 geometric-pattern opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10">
            <span className="inline-block bg-white/10 text-blue-200 text-[10px] sm:text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-white/15 tracking-wider">PLATFORM IMPACT</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-3">Making a Real Difference</h2>
            <p className="text-blue-200/60 text-xs sm:text-sm max-w-md mx-auto">Measurable impact across Delhi's infrastructure landscape</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <ImpactStat value="₹12,400 Cr" label="Infrastructure Tracked" icon={<TrendingUp className="h-5 w-5" />} delay={0} />
            <ImpactStat value="8.4 Lakh" label="Monthly Notifications" icon={<Bell className="h-5 w-5" />} delay={100} />
            <ImpactStat value="92%" label="Citizen Satisfaction" icon={<CheckCircle2 className="h-5 w-5" />} delay={200} />
            <ImpactStat value="45 Sec" label="Avg. Response Time" icon={<Zap className="h-5 w-5" />} delay={300} />
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="bg-background py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center bg-card rounded-3xl p-8 sm:p-12 md:p-16 border border-border card-shadow relative overflow-hidden">
            {/* Decorative gradient blob */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-3 sm:mb-4">
                Ready to Explore?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                See real government projects, track progress in real-time, and discover schemes designed just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={goCitizen}
                  className="gradient-saffron text-primary-foreground border-0 hover:opacity-90 px-6 sm:px-10 h-12 sm:h-14 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.03] text-sm sm:text-base gap-2 font-semibold w-full sm:w-auto"
                >
                  Start as Citizen <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={goAdmin}
                  className="px-6 sm:px-10 h-12 sm:h-14 rounded-xl text-sm sm:text-base gap-2 font-semibold w-full sm:w-auto"
                >
                  Open Admin Portal <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ─── Reusable section header ─── */
function SectionHeader({ badge, badgeColor, title, subtitle }: { badge: string; badgeColor: string; title: string; subtitle: string }) {
  const { ref, visible } = useInView();
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    secondary: 'bg-secondary/10 text-secondary',
    warning: 'bg-warning/10 text-warning',
  };
  return (
    <div ref={ref} className={`text-center mb-10 sm:mb-14 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <span className={`inline-block ${colorMap[badgeColor] || colorMap.primary} text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest`}>{badge}</span>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-2 sm:mb-3">{title}</h2>
      <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-md mx-auto">{subtitle}</p>
    </div>
  );
}

/* ─── Live stat card ─── */
function LiveStatCard({ icon, value, label, color, delay }: { icon: React.ReactNode; value: string; label: string; color: string; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl p-4 sm:p-5 border border-border card-shadow flex items-center gap-3 sm:gap-4 transition-all duration-500 hover:-translate-y-0.5 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-lg sm:text-xl font-extrabold text-foreground">{value}</div>
        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  );
}

/* ─── Mini feature pill ─── */
function MiniFeature({ icon, label, delay }: { icon: React.ReactNode; label: string; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`flex items-center gap-2 bg-card rounded-xl p-3 border border-border card-shadow transition-all duration-400 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-primary">{icon}</div>
      <span className="text-xs font-medium text-foreground">{label}</span>
      <CheckCircle2 className="h-3 w-3 text-accent ml-auto" />
    </div>
  );
}

/* ─── Impact stat (dark section) ─── */
function ImpactStat({ value, label, icon, delay }: { value: string; label: string; icon: React.ReactNode; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`text-center p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-600 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-center mb-3 text-secondary">{icon}</div>
      <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary-foreground mb-1">{value}</div>
      <div className="text-[10px] sm:text-xs text-blue-200/60 font-medium">{label}</div>
    </div>
  );
}
