import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { SCHEMES, DEMO_PROFILES, ProfileType } from '@/data/mockData';
import { Plus, Target, BarChart3, Clock } from 'lucide-react';

export default function SchemesManager() {
  const [schemes, setSchemes] = useState(SCHEMES);

  const toggleActive = (id: string) => {
    setSchemes((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
  };

  const addSchemeButton = (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gradient-saffron border-0 text-primary-foreground gap-1.5 min-h-[44px]"><Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add Scheme</span><span className="sm:hidden">Add</span></Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-lg">
        <DialogHeader><DialogTitle>Add New Scheme</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Scheme Name (English)" className="w-full h-11" />
          <Input placeholder="Scheme Name (Hindi)" className="w-full h-11" />
          <Textarea placeholder="Description" rows={3} className="w-full" />
          <Input placeholder="Benefit (e.g. ₹6,000/year)" className="w-full h-11" />
          <Input placeholder="Apply Link" className="w-full h-11" />
          <Input type="date" placeholder="Deadline" className="w-full h-11" />
          <Button className="w-full h-11">Add Scheme</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <AdminLayout title="Schemes Manager" subtitle={`${schemes.length} schemes configured`} headerActions={addSchemeButton}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {schemes.map((s) => (
          <div key={s.id} className="bg-card rounded-2xl border border-border card-shadow overflow-hidden hover:-translate-y-0.5 transition-all duration-300">
            <div className="h-1 gradient-primary" />
            <div className="p-3 sm:p-5">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-xs sm:text-sm truncate">{s.name}</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{s.nameHi}</p>
                  </div>
                </div>
                <Switch checked={s.active} onCheckedChange={() => toggleActive(s.id)} />
              </div>
              <span className="inline-block bg-accent/8 text-accent text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3">{s.benefit}</span>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-2">{s.description}</p>
              <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                {s.targetAudience.map((t) => (
                  <span key={t} className="bg-muted text-muted-foreground text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full">
                    {DEMO_PROFILES[t].occupationLabel}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" /> Triggered: <strong className="text-foreground">{s.timesTriggered}</strong>
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {s.deadline}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
