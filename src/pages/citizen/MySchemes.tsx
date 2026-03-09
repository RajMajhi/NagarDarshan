import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { SCHEMES, ProfileType } from '@/data/mockData';
import { Sparkles, IndianRupee, Clock, CheckCircle2, Target, ChevronDown, ChevronRight, User } from 'lucide-react';

const FILTERS = ['All', 'Farmer', 'Healthcare', 'Education', 'Financial'] as const;

const AI_EXPLANATIONS: Record<string, string> = {
  'pm-kisan': 'You are a farmer with income in the LOW category — PM-KISAN is designed exactly for people like you.',
  'mudra-loan': 'As a business owner or youth, Mudra Loan lets you start your business without collateral.',
  'ayushman-bharat': '₹5 Lakh free health insurance for your family — invaluable during emergencies.',
  'skill-india': 'Free training and certification for youth and students — boosts job opportunities.',
  'ujjwala': 'Free LPG connection for women and farmers — safe cooking environment for your family.',
  'beti-bachao': 'Scholarships and protection programs for girls — education support for your daughter.',
  'smart-cities': 'Smart infrastructure projects in your area — you benefit directly.',
  'pmay': '₹2.67L subsidy for affordable housing — your dream home can become reality.',
};

export default function MySchemes() {
  const { profile, profileType } = useApp();
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const relevantSchemes = SCHEMES.filter((s) => {
    if (filter === 'All') return s.targetAudience.includes(profileType);
    if (filter === 'Farmer') return s.targetAudience.includes('farmer');
    if (filter === 'Healthcare') return s.id === 'ayushman-bharat';
    if (filter === 'Education') return ['skill-india', 'beti-bachao'].includes(s.id);
    if (filter === 'Financial') return ['pm-kisan', 'mudra-loan', 'pmay'].includes(s.id);
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <AppHeader activeTab="schemes" />
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Profile Summary */}
        <div className="bg-card rounded-xl border border-border p-4 sm:p-5 card-shadow mb-4 sm:mb-6 relative overflow-hidden">
          <span className="absolute top-3 right-3 bg-purple/8 text-purple text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> AI Powered
          </span>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-foreground text-base sm:text-lg truncate">{profile.name}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{profile.occupationLabel}, Age {profile.age}</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">Based on your profile, <strong className="text-foreground">{relevantSchemes.length} schemes</strong> recommended for you</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 sm:pb-4 -mx-1 px-1">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all min-h-[36px] ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Scheme Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {relevantSchemes.map((s) => (
            <div key={s.id} className="bg-card rounded-xl border border-border card-shadow overflow-hidden hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
              <div className="p-3 sm:p-4 flex-1">
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm leading-snug">{s.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{s.nameHi}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2.5 flex-wrap">
                  {s.active && <span className="bg-accent/8 text-accent text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5"><CheckCircle2 className="h-3 w-3" /> ACTIVE</span>}
                  {s.targetAudience.includes(profileType) && <span className="bg-primary/8 text-primary text-[10px] px-2 py-0.5 rounded-full font-medium">{profile.occupationLabel.toUpperCase()}</span>}
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{s.description}</p>
                <div className="space-y-1 mb-3">
                  <p className="text-xs font-medium text-accent flex items-center gap-1"><IndianRupee className="h-3 w-3" /> {s.benefit}</p>
                  <p className="text-xs text-accent font-medium flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Eligible</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {s.deadline}</p>
                </div>
                <div className="flex gap-2 mb-2.5">
                  <Button size="sm" className="gradient-saffron border-0 text-primary-foreground h-9 text-xs min-h-[44px]">Apply Now →</Button>
                  <Button size="sm" variant="outline" className="h-9 text-xs min-h-[44px]">Learn More</Button>
                </div>
                <button onClick={() => setExpanded(expanded === s.id ? null : s.id)} className="text-[11px] text-purple hover:underline font-medium flex items-center gap-0.5 min-h-[36px]">
                  {expanded === s.id ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                  {expanded === s.id ? 'Hide' : 'Why this for you?'}
                </button>
                {expanded === s.id && (
                  <div className="mt-2 bg-purple/5 rounded-lg p-2.5 text-xs text-muted-foreground animate-fade-in flex items-start gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-purple flex-shrink-0 mt-0.5" />
                    {AI_EXPLANATIONS[s.id] || s.description}
                  </div>
                )}
              </div>
            </div>
          ))}
          {relevantSchemes.length === 0 && (
            <div className="col-span-full text-center py-10 text-muted-foreground text-sm">No schemes found for this filter.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
