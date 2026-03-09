import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryChip } from '@/components/shared/CategoryChip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { PENDING_PROJECTS, PendingProject } from '@/data/mockData';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, XCircle, Clock, Users, IndianRupee, Image } from 'lucide-react';

export default function PendingApprovals() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<PendingProject[]>(PENDING_PROJECTS);
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const l1Projects = projects.filter((p) => p.status === 'pending_l1');
  const l2Projects = projects.filter((p) => p.status === 'pending_l2');
  const rejectedProjects = projects.filter((p) => p.status === 'rejected');

  const handleApproveL1 = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: 'pending_l2' as const,
              approvalHistory: [
                ...p.approvalHistory,
                { action: 'approved_l1' as const, by: 'Supervisor Sharma', role: 'L1 Officer', timestamp: new Date().toISOString() },
              ],
            }
          : p
      )
    );
    toast({ title: '✅ L1 Approved', description: 'Project moved to Level 2 approval.' });
  };

  const handleApproveL2 = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: 'published' as const,
              approvalHistory: [
                ...p.approvalHistory,
                { action: 'approved_l2' as const, by: 'Senior Officer Verma', role: 'L2 Officer', timestamp: new Date().toISOString(), comment: 'Photos verified. Approved.' },
              ],
            }
          : p
      )
    );
    toast({ title: '🎉 Project is now live!', description: 'Project has been published to citizen view.' });
  };

  const handleReject = () => {
    if (!rejectTarget || !rejectReason.trim()) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === rejectTarget
          ? {
              ...p,
              status: 'rejected' as const,
              rejectReason: rejectReason.trim(),
              approvalHistory: [
                ...p.approvalHistory,
                { action: 'rejected' as const, by: 'Officer', role: 'Reviewer', timestamp: new Date().toISOString(), comment: rejectReason.trim() },
              ],
            }
          : p
      )
    );
    toast({ title: '❌ Project Rejected', description: 'Submitter will be notified with the reason.' });
    setRejectTarget(null);
    setRejectReason('');
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  const renderCard = (p: PendingProject, level: 'l1' | 'l2') => (
    <div key={p.id} className="bg-card rounded-xl border border-border p-4 sm:p-5 card-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug">🏗 {p.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">Submitted by: <span className="font-medium text-foreground">{p.submittedBy}</span></p>
        </div>
        <CategoryChip category={p.category} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" /> {formatCurrency(p.cost)}</span>
        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {formatNumber(p.beneficiaries)}</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {timeAgo(p.submittedAt)}</span>
      </div>

      <p className="text-xs text-muted-foreground mb-3">Ward: <span className="font-medium text-foreground">{p.ward}</span></p>

      {/* Photos */}
      <div className="flex items-center gap-2 mb-4">
        <Image className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Photos:</span>
        <div className="flex gap-1.5">
          {p.photos.map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center">
              <Image className="h-4 w-4 text-muted-foreground/50" />
            </div>
          ))}
        </div>
      </div>

      {/* L1 approved tag for L2 items */}
      {level === 'l2' && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="h-3 w-3" /> L1 ✓ Approved
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {level === 'l1' ? (
          <Button size="sm" className="flex-1 h-10 bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5 min-h-[44px]" onClick={() => handleApproveL1(p.id)}>
            <CheckCircle2 className="h-4 w-4" /> Approve — L1
          </Button>
        ) : (
          <Button size="sm" className="flex-1 h-10 bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5 min-h-[44px]" onClick={() => handleApproveL2(p.id)}>
            <CheckCircle2 className="h-4 w-4" /> Final Approve — PUBLISH
          </Button>
        )}
        <Button size="sm" variant="outline" className="flex-1 h-10 text-destructive border-destructive/30 hover:bg-destructive/10 gap-1.5 min-h-[44px]" onClick={() => setRejectTarget(p.id)}>
          <XCircle className="h-4 w-4" /> Reject
        </Button>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Pending Approvals" subtitle={`${l1Projects.length + l2Projects.length} projects awaiting approval`}>
      {/* L1 Section */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          🟡 Awaiting Level 1 Approval
          <span className="bg-warning/15 text-warning text-xs px-2 py-0.5 rounded-full">{l1Projects.length}</span>
        </h2>
        {l1Projects.length === 0 ? (
          <p className="text-sm text-muted-foreground bg-card rounded-xl border border-border p-6 text-center">No projects pending L1 approval.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {l1Projects.map((p) => renderCard(p, 'l1'))}
          </div>
        )}
      </div>

      {/* L2 Section */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          🔵 Awaiting Level 2 (Final) Approval
          <span className="bg-primary/15 text-primary text-xs px-2 py-0.5 rounded-full">{l2Projects.length}</span>
        </h2>
        {l2Projects.length === 0 ? (
          <p className="text-sm text-muted-foreground bg-card rounded-xl border border-border p-6 text-center">No projects pending L2 approval.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {l2Projects.map((p) => renderCard(p, 'l2'))}
          </div>
        )}
      </div>

      {/* Rejected */}
      {rejectedProjects.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            🔴 Rejected
            <span className="bg-destructive/15 text-destructive text-xs px-2 py-0.5 rounded-full">{rejectedProjects.length}</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {rejectedProjects.map((p) => (
              <div key={p.id} className="bg-card rounded-xl border border-destructive/20 p-4 sm:p-5 opacity-75">
                <h3 className="font-bold text-foreground text-sm mb-1">🏗 {p.title}</h3>
                <StatusBadge status="rejected" className="mb-2" />
                {p.rejectReason && (
                  <div className="bg-destructive/5 rounded-lg p-3 mt-2">
                    <p className="text-xs text-destructive font-medium mb-0.5">Reject Reason:</p>
                    <p className="text-xs text-muted-foreground">{p.rejectReason}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reject Dialog */}
      <Dialog open={!!rejectTarget} onOpenChange={(open) => !open && setRejectTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Please provide a reason for rejecting this project (required):</p>
            <Textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Enter rejection reason..." rows={3} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>Confirm Reject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
