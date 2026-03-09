import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryChip } from '@/components/shared/CategoryChip';
import { StarRating } from '@/components/shared/StarRating';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { PROJECTS, Project, CATEGORY_CONFIG, SCHEMES, PENDING_PROJECTS } from '@/data/mockData';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { Search, Eye, Pencil, Trash2, Users } from 'lucide-react';

export default function AllProjects() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = PROJECTS.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter !== 'all' && p.category !== catFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <AdminLayout title="All Projects" subtitle={`${filtered.length} projects found`}>
      {/* Filters — stack on mobile */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="pl-9 w-full h-11" />
        </div>
        <div className="flex gap-2">
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-xs sm:text-sm bg-card text-foreground flex-1 sm:flex-none h-11 min-h-[44px]">
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label.split('&')[0].trim()}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-xs sm:text-sm bg-card text-foreground flex-1 sm:flex-none h-11 min-h-[44px]">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="planning">Planning</option>
            <option value="pending_l1">Pending L1</option>
            <option value="pending_l2">Pending L2</option>
            <option value="published">Published</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table — horizontally scrollable with sticky first col */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground w-8">#</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground sticky left-0 bg-muted/30 z-10">Project</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Category</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Ward</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Cost</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Status</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Reach</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Rating</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className="border-b border-border hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setSelected(p)}>
                  <td className="p-2 sm:p-3 text-muted-foreground">{i + 1}</td>
                  <td className="p-2 sm:p-3 font-medium text-foreground max-w-[160px] sm:max-w-[200px] truncate sticky left-0 bg-card z-10">{p.title}</td>
                  <td className="p-2 sm:p-3"><CategoryChip category={p.category} /></td>
                  <td className="p-2 sm:p-3 text-muted-foreground text-[10px] sm:text-xs">{p.ward}</td>
                  <td className="p-2 sm:p-3 font-medium text-foreground">{formatCurrency(p.cost)}</td>
                  <td className="p-2 sm:p-3"><StatusBadge status={p.status} /></td>
                  <td className="p-2 sm:p-3 text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> {formatNumber(p.reach)}</td>
                  <td className="p-2 sm:p-3"><StarRating rating={p.rating} size="sm" /></td>
                  <td className="p-2 sm:p-3">
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 min-h-[44px] min-w-[44px]" onClick={(e) => { e.stopPropagation(); setSelected(p); }}><Eye className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 min-h-[44px] min-w-[44px]"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive min-h-[44px] min-w-[44px]"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No projects found.</div>
        )}
      </div>

      {/* Detail Drawer */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:w-[400px] md:w-[500px] overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left text-sm sm:text-base">{selected.title}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3 sm:space-y-4">
                <div className="flex gap-2">
                  <CategoryChip category={selected.category} />
                  <StatusBadge status={selected.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-muted/30 rounded-xl p-2.5 sm:p-3 text-center">
                    <p className="text-base sm:text-lg font-bold text-foreground">{formatCurrency(selected.cost)}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Cost</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-2.5 sm:p-3 text-center">
                    <p className="text-base sm:text-lg font-bold text-foreground">{formatNumber(selected.beneficiaries)}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Beneficiaries</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-2.5 sm:p-3 text-center">
                    <p className="text-base sm:text-lg font-bold text-foreground">{formatNumber(selected.reach)}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Reach</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-2.5 sm:p-3 text-center">
                    <StarRating rating={selected.rating} count={selected.ratingCount} />
                  </div>
                </div>
                {selected.progress && (
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-foreground mb-1">Progress: {selected.progress}%</p>
                    <Progress value={selected.progress} className="h-2" />
                  </div>
                )}
                <div className="space-y-2 text-xs sm:text-sm">
                  <h4 className="font-semibold text-foreground">What Changed</h4>
                  <div className="bg-destructive/5 rounded-xl p-3">
                    <p className="text-[10px] sm:text-xs text-destructive font-medium mb-1">BEFORE</p>
                    <p className="text-muted-foreground text-[10px] sm:text-xs">{selected.beforeDescription}</p>
                  </div>
                  <div className="bg-accent/5 rounded-xl p-3">
                    <p className="text-[10px] sm:text-xs text-accent font-medium mb-1">AFTER</p>
                    <p className="text-muted-foreground text-[10px] sm:text-xs">{selected.afterDescription}</p>
                  </div>
                </div>
                <div className="text-xs sm:text-sm">
                  <h4 className="font-semibold text-foreground mb-1">Impact</h4>
                  <p className="text-muted-foreground text-[10px] sm:text-xs">{selected.impactDescription}</p>
                </div>
                <div className="text-xs sm:text-sm">
                  <p className="text-muted-foreground"><strong>Contractor:</strong> {selected.contractor}</p>
                  <p className="text-muted-foreground"><strong>Funding:</strong> {selected.fundingSource}</p>
                </div>
                {selected.linkedSchemes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selected.linkedSchemes.map((id) => {
                      const s = SCHEMES.find((x) => x.id === id);
                      return s ? <span key={id} className="bg-primary/8 text-primary text-xs px-2 py-0.5 rounded-full">{s.name.split(' ').slice(0, 2).join(' ')}</span> : null;
                    })}
                  </div>
                )}
                {/* Approval History — Admin Only */}
                {(() => {
                  const pending = PENDING_PROJECTS.find((pp) => pp.title === selected.title);
                  if (!pending || pending.approvalHistory.length === 0) return null;
                  return (
                    <div className="border-t border-border pt-3">
                      <h4 className="font-semibold text-foreground text-xs sm:text-sm mb-2 flex items-center gap-1.5">📋 Approval History</h4>
                      <div className="space-y-2">
                        {pending.approvalHistory.map((evt, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] sm:text-xs">
                            <span className="mt-0.5">
                              {evt.action === 'submitted' ? '✅' : evt.action === 'approved_l1' ? '✅' : evt.action === 'approved_l2' ? '✅' : '❌'}
                            </span>
                            <div>
                              <p className="font-medium text-foreground">
                                {evt.action === 'submitted' ? 'Submitted' : evt.action === 'approved_l1' ? 'L1 Approved' : evt.action === 'approved_l2' ? 'L2 Approved' : 'Rejected'}
                                {' — '}
                                {new Date(evt.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </p>
                              <p className="text-muted-foreground">by: {evt.by}, {evt.role}</p>
                              {evt.comment && <p className="text-muted-foreground italic">"{evt.comment}"</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
}
