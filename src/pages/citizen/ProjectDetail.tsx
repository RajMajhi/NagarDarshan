import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, MapPin, Calendar, Users, IndianRupee, Target, Construction, ArrowDown, MoveHorizontal, Camera, X, Download } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryChip } from '@/components/shared/CategoryChip';
import { StarRating } from '@/components/shared/StarRating';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PROJECTS, SCHEMES, CATEGORY_CONFIG } from '@/data/mockData';
import { formatCurrency, formatNumberFull } from '@/lib/formatters';
import { useToast } from '@/hooks/use-toast';

function BeforeAfterSlider({ category }: { category: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  };

  useEffect(() => {
    const onUp = () => { dragging.current = false; };
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchend', onUp);
    window.addEventListener('touchmove', onTouchMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-48 sm:h-52 md:h-64 lg:h-72 rounded-xl overflow-hidden cursor-col-resize select-none touch-none"
      onMouseDown={() => { dragging.current = true; }}
      onTouchStart={() => { dragging.current = true; }}
    >
      {/* Before image (full width behind) */}
      <img
        src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80"
        alt="Before construction"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* After image (clipped from right) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <img
          src="https://images.unsplash.com/photo-1562261377-a4e65bf7fb5a?w=800&q=80"
          alt="After completion"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      {/* Drag handle */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-card rounded-full flex items-center justify-center border-2 border-primary" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
          <MoveHorizontal className="h-4 w-4 text-primary" />
        </div>
      </div>
      <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-destructive text-destructive-foreground text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md z-20">BEFORE</span>
      <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 bg-accent text-accent-foreground text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md z-20">AFTER</span>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-foreground/50 text-card text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 rounded-full z-20 whitespace-nowrap">← Drag to compare →</span>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userRating, setUserRating] = useState(0);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const project = PROJECTS.find((p) => p.id === id);

  const linkedSchemes = project ? SCHEMES.filter((s) => project.linkedSchemes.includes(s.id)) : [];

  const handleRate = (rating: number) => {
    setUserRating(rating);
    toast({ title: 'Thank you!', description: `You rated this project ${rating} stars.` });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast({ title: 'Link copied!', description: 'Share this project with friends.' });
  };

  const handleDownloadReport = useCallback(async () => {
    if (!project) return;
    toast({ title: 'Downloading...', description: 'Generating your PDF report.' });
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const w = doc.internal.pageSize.getWidth();
    const statusText = project.status === 'completed' ? '✅ Completed' : project.status === 'ongoing' ? '🔄 In Progress' : '📋 Planned';
    const endLabel = project.status === 'completed' ? 'Completed' : 'Expected';
    const endDateStr = new Date(project.endDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    let y = 20;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('NagraDarshan | MCD Delhi', w / 2, y, { align: 'center' });
    y += 6;
    doc.setDrawColor(180);
    doc.line(20, y, w - 20, y);
    y += 12;

    doc.setFontSize(13);
    doc.text(`PROJECT: ${project.title}`, 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Ward: ${project.ward}`, 20, y); y += 7;
    doc.text(`Status: ${statusText}`, 20, y); y += 12;

    doc.text(`Cost: ${formatCurrency(project.cost)}`, 20, y); y += 7;
    doc.text(`Benefited: ${formatNumberFull(project.beneficiaries)}`, 20, y); y += 7;
    doc.text(`${endLabel}: ${endDateStr}`, 20, y); y += 7;
    doc.text(`Rating: ${project.rating}/5`, 20, y); y += 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('IMPACT:', 20, y); y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const impactLines = doc.splitTextToSize(project.impactDescription, w - 40);
    doc.text(impactLines, 20, y);
    y += impactLines.length * 5 + 8;

    doc.setFontSize(10);
    doc.text(`SOURCE: ${project.fundingSource}`, 20, y); y += 6;
    doc.text(`CONTRACTOR: ${project.contractor}`, 20, y); y += 10;

    doc.setDrawColor(180);
    doc.line(20, y, w - 20, y);
    y += 8;
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text('Downloaded from NagraDarshan', w / 2, y, { align: 'center' }); y += 5;
    doc.text('nagra-darshan.lovable.app', w / 2, y, { align: 'center' });

    const safeName = project.title.replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`NagraDarshan_${safeName}.pdf`);
  }, [project, toast]);

  if (!project) return <div className="p-8 text-center text-muted-foreground">Project not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <AppHeader />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 max-w-4xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3 sm:mb-4 transition-colors min-h-[44px]">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Hero — full width slider on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-5 sm:mb-6">
          <BeforeAfterSlider category={project.category} />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <CategoryChip category={project.category} />
              <StatusBadge status={project.status} />
              {(() => {
                const daysAgo = Math.floor((Date.now() - new Date(project.endDate).getTime()) / 86400000);
                const bg = daysAgo <= 7 ? 'bg-accent/15 text-accent' : daysAgo <= 30 ? 'bg-warning/15 text-warning' : 'bg-destructive/15 text-destructive';
                return <span className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full ${bg}`}>🕐 Last updated {daysAgo} days ago</span>;
              })()}
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1.5 leading-tight">{project.title}</h1>
            <p className="text-muted-foreground flex items-center gap-1 text-xs sm:text-sm mb-3 sm:mb-4">
              <MapPin className="h-3.5 w-3.5" /> {project.ward}
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {[
                { icon: <IndianRupee className="h-4 w-4" />, value: formatCurrency(project.cost).replace('₹', ''), label: 'Cost' },
                { icon: <Users className="h-4 w-4" />, value: formatNumberFull(project.beneficiaries), label: 'Benefited' },
                { icon: <Calendar className="h-4 w-4" />, value: new Date(project.endDate).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }), label: project.status === 'completed' ? 'Completed' : 'Expected' },
                { icon: <Target className="h-4 w-4" />, value: project.reach.toLocaleString('en-IN'), label: 'Reach' },
              ].map((stat, i) => (
                <div key={i} className="bg-card rounded-xl p-2.5 sm:p-3 card-shadow border border-border text-center">
                  <div className="flex justify-center mb-1 text-primary">{stat.icon}</div>
                  <div className="font-bold text-foreground text-xs sm:text-sm">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        {project.progress && (
          <div className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border mb-4 sm:mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground text-xs sm:text-sm">Construction Progress</h3>
              <span className="text-sm sm:text-base font-bold text-primary">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2 sm:h-2.5" />
          </div>
        )}

        {/* What Changed + Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">What Changed</h3>
            <div className="bg-destructive/5 border border-destructive/15 rounded-xl p-3 sm:p-4">
              <p className="text-[10px] font-semibold text-destructive mb-1.5">BEFORE</p>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">{project.beforeDescription}</p>
            </div>
            <div className="flex justify-center">
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="bg-accent/5 border border-accent/15 rounded-xl p-3 sm:p-4">
              <p className="text-[10px] font-semibold text-accent mb-1.5">AFTER</p>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">{project.afterDescription}</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border">
              <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-2">Impact</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{project.impactDescription}</p>
            </div>
            <div className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border">
              <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-2">Funding Details</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                <div><span className="text-muted-foreground block text-[10px] mb-0.5">Source</span><span className="font-medium text-foreground">{project.fundingSource}</span></div>
                <div><span className="text-muted-foreground block text-[10px] mb-0.5">Contractor</span><span className="font-medium text-foreground">{project.contractor}</span></div>
                <div><span className="text-muted-foreground block text-[10px] mb-0.5">Start Date</span><span className="font-medium text-foreground">{new Date(project.startDate).toLocaleDateString('en-IN')}</span></div>
                <div><span className="text-muted-foreground block text-[10px] mb-0.5">End Date</span><span className="font-medium text-foreground">{new Date(project.endDate).toLocaleDateString('en-IN')}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Linked Schemes */}
        {linkedSchemes.length > 0 && (
          <div className="mb-4 sm:mb-5">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3">Related Government Schemes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {linkedSchemes.map((scheme) => (
                <div key={scheme.id} className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border flex items-center gap-3 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-xs sm:text-sm">{scheme.name}</p>
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground">{scheme.benefit}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs h-9 flex-shrink-0 min-h-[44px]">Apply →</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rating + Share */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border">
            <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-1">Rate This Project</h3>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground mb-2">Your feedback helps improve governance</p>
            <StarRating rating={userRating || project.rating} interactive onRate={handleRate} size="lg" count={project.ratingCount} />
            <div className="mt-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setPhotoPreview(url);
                    toast({ title: 'Photo added!', description: 'Thanks for sharing ground reality.' });
                  }
                }}
              />
              {photoPreview ? (
                <div className="relative inline-block">
                  <img src={photoPreview} alt="User upload" className="w-20 h-20 object-cover rounded-lg border border-border" />
                  <button onClick={() => setPhotoPreview(null)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-border bg-muted/40 rounded-lg py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors min-h-[44px]"
                >
                  <Camera className="h-3.5 w-3.5" /> 📷 Add Your Photo
                </button>
              )}
              <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-1.5">Help others see the ground reality</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-2">Share This Project</h3>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={handleShare} className="gap-1 text-xs h-9 min-h-[44px]">
                <Share2 className="h-3.5 w-3.5" /> Copy Link
              </Button>
              <Button size="sm" className="gradient-saffron border-0 text-primary-foreground text-xs h-9 min-h-[44px]" asChild>
                <a href={`https://wa.me/?text=Check out this project: ${project.title}`} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDownloadReport}
                className="gap-1 text-xs h-9 min-h-[44px] border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> ⬇ Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
