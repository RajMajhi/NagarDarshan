import { BarChart3, Map, Plus, List, TrendingUp, Target, Bell, Shield, ClipboardCheck } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { PENDING_PROJECTS } from '@/data/mockData';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from '@/components/ui/sidebar';

const pendingCount = PENDING_PROJECTS.filter(p => p.status === 'pending_l1' || p.status === 'pending_l2').length;

const items = [
  { title: 'Dashboard', url: '/admin', icon: BarChart3 },
  { title: 'Project Map', url: '/admin/map', icon: Map },
  { title: 'Add Project', url: '/admin/add', icon: Plus },
  { title: 'Pending Approvals', url: '/admin/approvals', icon: ClipboardCheck, badge: pendingCount },
  { title: 'All Projects', url: '/admin/projects', icon: List },
  { title: 'Analytics', url: '/admin/analytics', icon: TrendingUp },
  { title: 'Schemes', url: '/admin/schemes', icon: Target },
  { title: 'Notifications', url: '/admin/notifications', icon: Bell },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarHeader className="p-3 border-b border-border">
        {!collapsed ? (
          <div className="flex items-center gap-2 px-1">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground leading-none">Admin Panel</p>
              <p className="text-[10px] text-muted-foreground">NagraDarshan</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mx-auto">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/admin'}
                      className="hover:bg-muted rounded-lg mx-1 text-sm"
                      activeClassName="bg-primary/8 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && (
                        <span className="flex items-center gap-2">
                          {item.title}
                          {'badge' in item && item.badge ? (
                            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none">
                              {item.badge}
                            </span>
                          ) : null}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
