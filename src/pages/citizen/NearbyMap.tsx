import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Circle, Popup } from 'react-leaflet';
import { AppHeader } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CategoryChip } from '@/components/shared/CategoryChip';
import { StarRating } from '@/components/shared/StarRating';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { PROJECTS, CATEGORY_CONFIG, ProjectCategory } from '@/data/mockData';
import { formatCurrency } from '@/lib/formatters';
import { Map, List, IndianRupee, MapPin, Users, Navigation, Footprints, Filter } from 'lucide-react';

const USER_LOCATION = { lat: 28.6839, lng: 77.1389 };

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function NearbyMap() {
  const navigate = useNavigate();
  const [view, setView] = useState<'map' | 'list'>('map');
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');

  const projectsWithDist = PROJECTS.map((p) => ({
    ...p,
    distance: getDistance(USER_LOCATION.lat, USER_LOCATION.lng, p.lat, p.lng),
  })).sort((a, b) => a.distance - b.distance);

  const filtered = filter === 'all' ? projectsWithDist : projectsWithDist.filter((p) => p.category === filter);

  const formatDist = (km: number) => km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;

  const filterChips = (
    <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
      <button onClick={() => setFilter('all')} className={`shrink-0 px-3 py-1.5 rounded-md text-xs font-medium transition-all min-h-[36px] ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
        All
      </button>
      {(Object.keys(CATEGORY_CONFIG) as ProjectCategory[]).map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`shrink-0 px-3 py-1.5 rounded-md text-xs font-medium transition-all min-h-[36px] ${filter === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          {CATEGORY_CONFIG[cat].label.split(' ')[0]}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <AppHeader activeTab="nearby" />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h1 className="font-bold text-foreground text-base sm:text-lg">Nearby Projects</h1>
          <div className="flex items-center gap-2">
            {/* Mobile filter drawer trigger */}
            <Drawer>
              <DrawerTrigger asChild>
                <button className="md:hidden flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-muted text-muted-foreground min-h-[36px]">
                  <Filter className="h-3.5 w-3.5" /> Filter
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filter Projects</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-6">
                  {filterChips}
                </div>
              </DrawerContent>
            </Drawer>

            <div className="flex bg-muted rounded-lg p-0.5">
              <button onClick={() => setView('map')} className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors min-h-[36px] ${view === 'map' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                <Map className="h-3.5 w-3.5" /> Map
              </button>
              <button onClick={() => setView('list')} className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors min-h-[36px] ${view === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                <List className="h-3.5 w-3.5" /> List
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Filter Chips */}
        <div className="hidden md:block pb-3">
          {filterChips}
        </div>
      </div>

      {view === 'map' ? (
        <div className="flex-1 relative min-h-[300px] md:min-h-[500px]">
          <MapContainer center={[USER_LOCATION.lat, USER_LOCATION.lng]} zoom={12} className="h-full w-full" zoomControl={false}><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OSM' /><CircleMarker center={[USER_LOCATION.lat, USER_LOCATION.lng]} radius={8} pathOptions={{ color: '#3B76D8', fillColor: '#3B76D8', fillOpacity: 1, weight: 3 }}><Popup>You are here</Popup></CircleMarker><Circle center={[USER_LOCATION.lat, USER_LOCATION.lng]} radius={100} pathOptions={{ color: '#3B76D8', fillColor: '#3B76D8', fillOpacity: 0.12, weight: 0 }} />{filtered.map((project) => {
            const config = CATEGORY_CONFIG[project.category];
            return (
              <React.Fragment key={project.id}><Circle center={[project.lat, project.lng]} radius={500} pathOptions={{ color: '#E87840', fillColor: '#E87840', fillOpacity: 0.06, dashArray: '6 3', weight: 1.5 }} /><CircleMarker center={[project.lat, project.lng]} radius={8} pathOptions={{ color: '#fff', fillColor: config.color, fillOpacity: 1, weight: 2 }}><Popup>
                    <div className="min-w-[180px]">
                      <p className="font-semibold text-sm">{project.title}</p>
                      <p className="text-xs mt-1">{formatDist(project.distance)} away</p>
                      <p className="text-xs">{formatCurrency(project.cost)}</p>
                      <button onClick={() => navigate(`/citizen/project/${project.id}`)} className="text-xs font-medium mt-2 block text-primary hover:underline">
                        View Details →
                      </button>
                    </div>
                  </Popup></CircleMarker></React.Fragment>
            );
          })}</MapContainer>
        </div>
      ) : (
        <div className="container mx-auto px-3 sm:px-4 md:px-6 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/citizen/project/${project.id}`)}
                className="bg-card rounded-xl p-3 sm:p-4 card-shadow border border-border cursor-pointer hover:-translate-y-0.5 hover:card-shadow-hover transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <CategoryChip category={project.category} />
                    <span className="text-xs bg-primary/8 text-primary px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                      <Footprints className="h-3 w-3" /> {formatDist(project.distance)}
                    </span>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground mb-2.5 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {project.ward}
                </p>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="font-medium text-foreground">
                      {formatCurrency(project.cost)}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" /> {project.beneficiaries.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <StarRating rating={project.rating} />
                  <Button size="sm" variant="ghost" className="text-xs h-9 p-0 text-primary gap-1 min-h-[44px]" asChild>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${project.lat},${project.lng}`} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                      <Navigation className="h-3 w-3" /> Directions
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
