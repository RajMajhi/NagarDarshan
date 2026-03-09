import { useNavigate } from 'react-router-dom';

export function CitizenNav({ active }: { active: string }) {
  const navigate = useNavigate();
  const items = [
    { id: 'home', icon: '🏠', label: 'Home', path: '/citizen' },
    { id: 'nearby', icon: '📍', label: 'Nearby', path: '/citizen/nearby' },
    { id: 'schemes', icon: '🎯', label: 'Schemes', path: '/citizen/schemes' },
    { id: 'history', icon: '📜', label: 'History', path: '/citizen/history' },
  ];
  return (
    <nav className="sticky top-[calc(3px+3.5rem)] z-40 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex justify-center gap-2 py-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-1.5 px-6 py-2 rounded-xl transition-all text-sm font-medium ${
              active === item.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
