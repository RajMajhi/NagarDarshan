import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Circle, Popup } from 'react-leaflet';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { PROJECTS, CATEGORY_CONFIG, ProjectCategory } from '@/data/mockData';
import { formatCurrency } from '@/lib/formatters';
import { Filter } from 'lucide-react';

export default function ProjectMap() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ProjectCategory[]>([]);

  const filtered = filters.length
    ? PROJECTS.filter((p) => filters.includes(p.category))
    : PROJECTS;

  const toggleFilter = (cat: ProjectCategory) => {
    setFilters((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  };

  const filterContent = (
    <>
      <h3 className="font-semibold text-sm text-foreground mb-3">Filter by Category</h3>
      <div className="space-y-2 mb-3">
        {(Object.keys(CATEGORY_CONFIG) as ProjectCategory[]).map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          return (
            <label key={cat} className="flex items-center gap-2 text-xs cursor-pointer min-h-[36px]">
              <input
                type="checkbox"
                checked={filters.length === 0 || filters.includes(cat)}
                onChange={() => toggleFilter(cat)}
                className="rounded"
              />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }} />
              <span className="text-muted-foreground">{config.label.split(' ')[0]}</span>
            </label>
          );
        })}
      </div>
      <div className="text-xs text-muted-foreground border-t border-border pt-2">
        Showing {filtered.length} of {PROJECTS.length} projects
      </div>
      {filters.length > 0 && (
        <Button variant="ghost" size="sm" onClick={() => setFilters([])} className="mt-2 w-full text-xs h-9">
          Reset Filters
        </Button>
      )}
    </>
  );

  return (
    <AdminLayout title="Project Map" subtitle="Interactive map of all Delhi projects" fullWidth noFooter>
      <div className="flex-1 relative min-h-[300px]" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Desktop Filter Panel */}
        <div className="hidden md:block absolute top-3 right-3 z-[1000] bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border max-w-[240px]">
          {filterContent}
        </div>

        {/* Mobile Filter Drawer */}
        <div className="md:hidden absolute top-3 right-3 z-[1000]">
          <Drawer>
            <DrawerTrigger asChild>
              <button className="bg-card/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-border flex items-center gap-1.5 text-xs font-medium text-foreground min-h-[44px]">
                <Filter className="h-3.5 w-3.5" /> Filter
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filter Projects</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-6">
                {filterContent}
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <MapContainer center={[28.6139, 77.209]} zoom={11} className="h-full w-full" zoomControl={false}><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{filtered.map((project) => {
            const config = CATEGORY_CONFIG[project.category];
            return (
              <React.Fragment key={project.id}><Circle center={[project.lat, project.lng]} radius={500} pathOptions={{ color: '#F97316', fillColor: '#F97316', fillOpacity: 0.1, dashArray: '8 4', weight: 2 }} /><CircleMarker center={[project.lat, project.lng]} radius={10} pathOptions={{ color: '#fff', fillColor: config.color, fillOpacity: 1, weight: 2 }}><Popup>
                    <div className="min-w-[180px]">
                      <div className="font-semibold text-sm mb-1">{project.title}</div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: config.color + '20', color: config.color }}>
                          {config.label.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div>Cost: {formatCurrency(project.cost)}</div>
                        <div>📍 {project.ward}</div>
                      </div>
                      <button onClick={() => navigate(`/citizen/project/${project.id}`)} className="text-xs font-medium mt-2 block text-primary hover:underline">
                        View Details →
                      </button>
                    </div>
                  </Popup></CircleMarker></React.Fragment>
            );
          })}</MapContainer>
      </div>
    </AdminLayout>
  );
}
