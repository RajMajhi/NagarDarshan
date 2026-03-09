import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  headerActions?: ReactNode;
  fullWidth?: boolean;
  noFooter?: boolean;
}

export function AdminLayout({ children, title, subtitle, headerActions, fullWidth, noFooter }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <SidebarProvider>
        <div className="flex flex-1 w-full">
          {/* Sidebar hidden on mobile, shown on md+ */}
          <div className="hidden md:block">
            <AdminSidebar />
          </div>
          <main className="flex-1 flex flex-col overflow-auto bg-background">
            {/* Page Header */}
            <div className="bg-card border-b border-border px-3 sm:px-4 md:px-6">
              <div className="flex items-center justify-between h-12 sm:h-14">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <SidebarTrigger className="min-h-[44px] min-w-[44px]" />
                  <div className="min-w-0">
                    <h1 className="text-sm sm:text-base font-bold text-foreground leading-tight truncate">{title}</h1>
                    {subtitle && <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{subtitle}</p>}
                  </div>
                </div>
                {headerActions && <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">{headerActions}</div>}
              </div>
            </div>

            {/* Page Content */}
            <div className={`flex-1 ${fullWidth ? '' : 'p-3 sm:p-4 md:p-6'}`}>
              {!fullWidth && <div className="max-w-7xl mx-auto w-full">{children}</div>}
              {fullWidth && children}
            </div>

            {!noFooter && <Footer />}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
