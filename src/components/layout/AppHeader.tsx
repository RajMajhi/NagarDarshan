import { useApp } from '@/contexts/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, Shield, User, Home, MapPin, Target, Clock, Menu, X } from 'lucide-react';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'en' as const, label: 'EN' },
  { code: 'hi' as const, label: 'हिं' },
];

const CITIZEN_TABS = [
  { id: 'home', label: 'Home', path: '/citizen', icon: Home },
  { id: 'nearby', label: 'Nearby', path: '/citizen/nearby', icon: MapPin },
  { id: 'schemes', label: 'Schemes', path: '/citizen/schemes', icon: Target },
  { id: 'history', label: 'History', path: '/citizen/history', icon: Clock },
];

export function TricolorBar() {
  return <div className="h-[3px] tricolor-bar w-full" />;
}

export function AppHeader({ activeTab }: { activeTab?: string }) {
  const { viewMode, setViewMode, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = location.pathname.startsWith('/admin');
  const isCitizen = location.pathname.startsWith('/citizen');

  const handleToggle = (mode: 'admin' | 'citizen') => {
    setViewMode(mode);
    navigate(mode === 'admin' ? '/admin' : '/citizen');
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setViewMode('landing');
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0 min-h-[44px]">
            <span className="ashoka-chakra text-primary" />
            <span className="font-bold text-base sm:text-lg text-foreground tracking-tight">NagraDarshan</span>
          </button>

          {/* Center: Citizen Navigation Tabs - Desktop only */}
          {isCitizen && (
            <nav className="hidden md:flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
              {CITIZEN_TABS.map((tab) => {
                const isActive = activeTab === tab.id || (!activeTab && location.pathname === tab.path);
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => navigate(tab.path)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 min-h-[44px] ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-1.5">
            {/* Language Toggle */}
            <div className="flex items-center gap-0.5 bg-muted rounded-md p-0.5">
              <Globe className="h-3.5 w-3.5 text-muted-foreground ml-1.5" />
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all min-h-[36px] min-w-[36px] flex items-center justify-center ${
                    language === lang.code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* View Toggle - Desktop */}
            <div className="hidden sm:flex items-center gap-0.5 bg-muted rounded-md p-0.5">
              <Button
                variant={isAdmin ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleToggle('admin')}
                className="text-xs h-9 gap-1 px-2.5"
              >
                <Shield className="h-3.5 w-3.5" />
                Admin
              </Button>
              <Button
                variant={isCitizen ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleToggle('citizen')}
                className="text-xs h-9 gap-1 px-2.5"
              >
                <User className="h-3.5 w-3.5" />
                Citizen
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden p-2 rounded-md hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-border bg-card px-4 py-3 space-y-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <Button
                variant={isAdmin ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToggle('admin')}
                className="flex-1 text-xs h-11 gap-1.5"
              >
                <Shield className="h-3.5 w-3.5" />
                Admin Portal
              </Button>
              <Button
                variant={isCitizen ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToggle('citizen')}
                className="flex-1 text-xs h-11 gap-1.5"
              >
                <User className="h-3.5 w-3.5" />
                Citizen Portal
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Bottom Tab Bar for Citizen on Mobile */}
      {isCitizen && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.08)] safe-area-bottom">
          <div className="flex items-center justify-around px-2 py-1">
            {CITIZEN_TABS.map((tab) => {
              const isActive = activeTab === tab.id || (!activeTab && location.pathname === tab.path);
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg min-h-[48px] min-w-[56px] transition-all ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                  <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : ''}`}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
