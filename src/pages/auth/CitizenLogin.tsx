import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { DEMO_PROFILES, ProfileType } from '@/data/mockData';
import { User, Eye, EyeOff, ArrowLeft, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PROFILE_OPTIONS: { type: ProfileType; label: string; desc: string }[] = [
  { type: 'farmer', label: '👨‍🌾 Farmer', desc: 'Agricultural worker' },
  { type: 'student', label: '🎓 Student', desc: 'School or college' },
  { type: 'senior', label: '🧓 Senior Citizen', desc: 'Age 60+' },
  { type: 'youth', label: '👦 Youth', desc: 'Young professional' },
];

export default function CitizenLogin() {
  const navigate = useNavigate();
  const { setViewMode, setProfileType } = useApp();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>('farmer');
  const [form, setForm] = useState({ name: '', phone: '', password: '', aadhaar: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.password) {
      toast({ title: 'Error', description: 'Please fill all required fields', variant: 'destructive' });
      return;
    }
    if (isSignup && !form.name) {
      toast({ title: 'Error', description: 'Please enter your name', variant: 'destructive' });
      return;
    }
    setProfileType(selectedProfile);
    toast({ title: isSignup ? 'Account Created' : 'Login Successful', description: `Welcome${form.name ? ', ' + form.name : ''}! 🎉` });
    setViewMode('citizen');
    navigate('/citizen');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 h-14 flex items-center">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-14 h-14 rounded-2xl gradient-saffron flex items-center justify-center mx-auto mb-3 shadow-lg">
              <User className="h-7 w-7 text-primary-foreground" />
            </div>
            <CardTitle className="text-xl font-extrabold">{isSignup ? 'Create Citizen Account' : 'Citizen Login'}</CardTitle>
            <CardDescription className="text-sm">
              {isSignup ? 'Register to track projects near you' : 'Access nearby projects & government schemes'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Ramesh Kumar" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" type="tel" placeholder="98765 43210" className="pl-10" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {isSignup && (
                <>
                  {/* Profile type selector */}
                  <div className="space-y-2">
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {PROFILE_OPTIONS.map(opt => (
                        <button
                          key={opt.type}
                          type="button"
                          onClick={() => setSelectedProfile(opt.type)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedProfile === opt.type
                              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <span className="text-sm font-semibold">{opt.label}</span>
                          <span className="block text-[10px] text-muted-foreground mt-0.5">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full h-11 gradient-saffron text-primary-foreground border-0 font-semibold">
                {isSignup ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm text-muted-foreground">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-semibold hover:underline">
                  {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {/* Demo hint */}
            <div className="mt-4 p-3 bg-muted rounded-xl text-center">
              <p className="text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">Demo Mode:</span> Enter any phone & password to continue
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
