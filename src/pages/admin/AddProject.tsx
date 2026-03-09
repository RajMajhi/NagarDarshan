import { useState, useRef } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { CATEGORY_CONFIG, ProjectCategory, SCHEMES } from '@/data/mockData';
import { MapContainer, TileLayer, CircleMarker, Circle, useMapEvents } from 'react-leaflet';
import { Construction, Hospital, Landmark, GraduationCap, Droplets, Trees, MapPin, Camera, IndianRupee, Users, Calendar, CheckCircle2, Send, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import 'leaflet/dist/leaflet.css';

const FUNDING_SOURCES = ['Smart Cities Mission', 'MCD Budget', 'State Government', 'Central Government', 'PPP'];
const STATUS_OPTIONS = ['Planning', 'Under Construction', 'Completed'] as const;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  road: <Construction className="h-6 w-6 sm:h-8 sm:w-8" />,
  hospital: <Hospital className="h-6 w-6 sm:h-8 sm:w-8" />,
  bridge: <Landmark className="h-6 w-6 sm:h-8 sm:w-8" />,
  school: <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />,
  drainage: <Droplets className="h-6 w-6 sm:h-8 sm:w-8" />,
  park: <Trees className="h-6 w-6 sm:h-8 sm:w-8" />,
};

function LocationPicker({ position, setPosition, radius }: { position: [number, number] | null; setPosition: (p: [number, number]) => void; radius: number }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  if (!position) return null;
  return (
    <><CircleMarker center={position} radius={8} pathOptions={{ color: 'hsl(221,65%,50%)', fillColor: 'hsl(221,65%,50%)', fillOpacity: 1 }} /><Circle center={position} radius={radius} pathOptions={{ color: 'hsl(20,85%,55%)', fillColor: 'hsl(20,85%,55%)', fillOpacity: 0.1, dashArray: '10 6' }} /></>
  );
}

export default function AddProject() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory | ''>('');
  const [ward, setWard] = useState('');
  const [funding, setFunding] = useState('');
  const [contractor, setContractor] = useState('');
  const [status, setStatus] = useState('');
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [radius, setRadius] = useState([500]);
  const [cost, setCost] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [impact, setImpact] = useState('');
  const [linkedSchemes, setLinkedSchemes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Completion photos
  const [completionPhotos, setCompletionPhotos] = useState<{ file: File; preview: string }[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos: { file: File; preview: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast({ title: '⚠️ Invalid format', description: 'Only JPG and PNG files are accepted.', variant: 'destructive' });
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: '⚠️ File too large', description: `${file.name} exceeds 5MB limit.`, variant: 'destructive' });
        continue;
      }
      newPhotos.push({ file, preview: URL.createObjectURL(file) });
    }
    setCompletionPhotos((prev) => [...prev, ...newPhotos]);
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const removePhoto = (index: number) => {
    setCompletionPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const toggleScheme = (id: string) => {
    setLinkedSchemes((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const canSubmit = completionPhotos.length >= 2;
  const progressValue = (step / 4) * 100;
  const stepLabels = ['Basic Info', 'Location', 'Photos & Impact', 'Review & Submit'];

  const handleSubmit = () => {
    setSubmitted(true);
    toast({ title: '✅ Project submitted!', description: 'Awaiting Level 1 Officer approval.' });
  };

  return (
    <AdminLayout title="Add New Project" subtitle={`Step ${step} of 4: ${stepLabels[step - 1]}`}>
      <div className="max-w-3xl mx-auto w-full">
        {/* Progress */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mb-2">
            {stepLabels.map((label, i) => (
              <span key={i} className={step > i ? 'text-primary font-semibold' : step === i + 1 ? 'text-foreground font-medium' : ''}>
                <span className="sm:hidden">{i + 1}</span>
                <span className="hidden sm:inline">Step {i + 1}: {label}</span>
              </span>
            ))}
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {submitted ? (
          <div className="text-center py-12 sm:py-16 animate-fade-in">
            <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-accent mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Project Submitted!</h2>
            <p className="text-muted-foreground text-sm">Awaiting Level 1 Officer approval.</p>
            <p className="text-xs text-muted-foreground mt-1">Status: <span className="font-semibold text-warning">pending_l1</span></p>
            <Button className="mt-6 min-h-[44px]" onClick={() => { setSubmitted(false); setStep(1); setCompletionPhotos([]); }}>Add Another Project</Button>
          </div>
        ) : step === 1 ? (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Project Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter project title" className="text-base h-11 sm:h-12 w-full" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {(Object.keys(CATEGORY_CONFIG) as ProjectCategory[]).map((cat) => {
                  const config = CATEGORY_CONFIG[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`p-3 sm:p-4 rounded-xl border-2 text-center transition-all hover:-translate-y-0.5 min-h-[44px] ${category === cat ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/30'}`}
                    >
                      <div className="flex justify-center mb-1.5 sm:mb-2 text-muted-foreground">{CATEGORY_ICONS[cat]}</div>
                      <span className="text-[10px] sm:text-xs font-medium text-foreground">{config.label.split('&')[0].trim()}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Ward Name</label>
              <Input value={ward} onChange={(e) => setWard(e.target.value)} placeholder="e.g. Rohini Ward 34" className="w-full h-11" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Funding Source</label>
              <div className="flex flex-wrap gap-2">
                {FUNDING_SOURCES.map((src) => (
                  <button key={src} onClick={() => setFunding(src)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all min-h-[36px] ${funding === src ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/30'}`}>
                    {src}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Contractor</label>
              <Input value={contractor} onChange={(e) => setContractor(e.target.value)} placeholder="Contractor name" className="w-full h-11" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button key={s} onClick={() => setStatus(s)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all min-h-[44px] ${status === s ? 'bg-accent text-accent-foreground border-accent' : 'border-border text-muted-foreground hover:border-accent/30'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={() => setStep(2)} className="w-full h-11 sm:h-12 text-sm sm:text-base">Next: Location →</Button>
          </div>
        ) : step === 2 ? (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <p className="text-xs sm:text-sm text-muted-foreground">Click on map to set project location</p>
            <div className="h-[280px] sm:h-[350px] rounded-xl overflow-hidden border border-border">
              <MapContainer center={[28.6139, 77.209]} zoom={11} className="h-full w-full" scrollWheelZoom><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><LocationPicker position={position} setPosition={setPosition} radius={radius[0]} /></MapContainer>
            </div>
            {position && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[10px] sm:text-xs text-muted-foreground">Latitude</label>
                  <Input value={position[0].toFixed(6)} readOnly className="w-full h-11" />
                </div>
                <div>
                  <label className="text-[10px] sm:text-xs text-muted-foreground">Longitude</label>
                  <Input value={position[1].toFixed(6)} readOnly className="w-full h-11" />
                </div>
              </div>
            )}
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Geo-fence Radius: {radius[0]}m</label>
              <Slider value={radius} onValueChange={setRadius} min={200} max={2000} step={100} />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-11">← Back</Button>
              <Button onClick={() => setStep(3)} className="flex-1 h-11">Next: Impact →</Button>
            </div>
          </div>
        ) : step === 3 ? (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            {/* Mandatory completion photos */}
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">
                Project Completion Photos <span className="text-destructive">(Required — min 2)</span>
              </label>
              <input ref={photoInputRef} type="file" accept="image/jpeg,image/png" multiple className="hidden" onChange={handlePhotoUpload} />
              <button
                onClick={() => photoInputRef.current?.click()}
                className="w-full border-2 border-dashed border-primary/30 rounded-xl p-6 text-center text-muted-foreground cursor-pointer hover:bg-primary/3 transition-colors"
              >
                <Camera className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-primary/40" />
                <span className="text-xs sm:text-sm">Click to upload completion photos (JPG/PNG, max 5MB each)</span>
              </button>
              {completionPhotos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {completionPhotos.map((photo, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-border">
                      <img src={photo.preview} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                      <button onClick={() => removePhoto(i)} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {completionPhotos.length < 2 && (
                <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> ⚠️ Minimum 2 photos required as proof
                </p>
              )}
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Before Photos</label>
              <div className="border-2 border-dashed border-destructive/20 rounded-xl p-6 sm:p-8 text-center text-muted-foreground cursor-pointer hover:bg-destructive/3 transition-colors">
                <Camera className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-destructive/40" />
                <span className="text-xs sm:text-sm">Drag & drop before photos</span>
                <span className="inline-block ml-2 bg-destructive/8 text-destructive text-[10px] sm:text-xs px-2 py-0.5 rounded-full">BEFORE</span>
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">After Photos</label>
              <div className="border-2 border-dashed border-accent/20 rounded-xl p-6 sm:p-8 text-center text-muted-foreground cursor-pointer hover:bg-accent/3 transition-colors">
                <Camera className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-accent/40" />
                <span className="text-xs sm:text-sm">Drag & drop after photos</span>
                <span className="inline-block ml-2 bg-accent/8 text-accent text-[10px] sm:text-xs px-2 py-0.5 rounded-full">AFTER</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1"><IndianRupee className="h-3 w-3" /> Total Cost (₹ Crore)</label>
                <Input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="e.g. 12" className="w-full h-11" />
              </div>
              <div>
                <label className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> People Benefited</label>
                <Input type="number" value={beneficiaries} onChange={(e) => setBeneficiaries(e.target.value)} placeholder="e.g. 50000" className="w-full h-11" />
              </div>
              <div>
                <label className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Start Date</label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full h-11" />
              </div>
              <div>
                <label className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Completion Date</label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full h-11" />
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Impact Description</label>
              <Textarea value={impact} onChange={(e) => setImpact(e.target.value)} placeholder="Describe the impact..." rows={4} className="w-full" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground block mb-2">Linked Schemes</label>
              <div className="flex flex-wrap gap-2">
                {SCHEMES.map((s) => (
                  <button key={s.id} onClick={() => toggleScheme(s.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all min-h-[36px] ${linkedSchemes.includes(s.id) ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/30'}`}>
                    {s.name.split(' ').slice(0, 2).join(' ')}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-11">← Back</Button>
              <Button onClick={() => setStep(4)} className="flex-1 h-11">Next: Review →</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Review & Submit for Approval</h2>
            <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 card-shadow space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                {category && <div className="text-muted-foreground">{CATEGORY_ICONS[category]}</div>}
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground text-base sm:text-lg">{title || 'Untitled Project'}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {ward || 'No ward'} • {status || 'No status'}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div><span className="text-muted-foreground">Funding:</span> <span className="font-medium text-foreground">{funding || '—'}</span></div>
                <div><span className="text-muted-foreground">Contractor:</span> <span className="font-medium text-foreground">{contractor || '—'}</span></div>
                <div><span className="text-muted-foreground">Cost:</span> <span className="font-medium text-foreground">₹{cost || '0'} Cr</span></div>
                <div><span className="text-muted-foreground">Beneficiaries:</span> <span className="font-medium text-foreground">{beneficiaries || '0'}</span></div>
                <div><span className="text-muted-foreground">Start:</span> <span className="font-medium text-foreground">{startDate || '—'}</span></div>
                <div><span className="text-muted-foreground">End:</span> <span className="font-medium text-foreground">{endDate || '—'}</span></div>
              </div>
              {/* Completion photos preview */}
              {completionPhotos.length > 0 && (
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground mb-2">📷 Completion Photos ({completionPhotos.length})</p>
                  <div className="flex gap-2">
                    {completionPhotos.map((photo, i) => (
                      <div key={i} className="w-14 h-14 rounded-lg overflow-hidden border border-border">
                        <img src={photo.preview} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {position && (
                <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {position[0].toFixed(4)}, {position[1].toFixed(4)} • Radius: {radius[0]}m
                </p>
              )}
              {impact && <p className="text-xs sm:text-sm text-muted-foreground border-t border-border pt-3">{impact}</p>}
              {linkedSchemes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
                  {linkedSchemes.map((id) => {
                    const s = SCHEMES.find((x) => x.id === id);
                    return s ? <span key={id} className="bg-primary/8 text-primary text-xs px-2 py-0.5 rounded-full">{s.name.split(' ').slice(0, 2).join(' ')}</span> : null;
                  })}
                </div>
              )}
            </div>

            {!canSubmit && (
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                <p className="text-xs text-destructive font-medium">⚠️ Minimum 2 photos required as proof. Go back to Step 3 to upload.</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1 h-11">← Edit</Button>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex-1 text-sm sm:text-base h-11 sm:h-12 gap-2 border-0 text-white"
                style={{ backgroundColor: canSubmit ? '#EA580C' : undefined }}
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" /> Submit for Approval
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
