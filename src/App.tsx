import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { lazy, Suspense } from "react";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/auth/AdminLogin";
import CitizenLogin from "./pages/auth/CitizenLogin";
import Dashboard from "./pages/admin/Dashboard";
const ProjectMap = lazy(() => import("./pages/admin/ProjectMap"));
import AddProject from "./pages/admin/AddProject";
import AllProjects from "./pages/admin/AllProjects";
import PendingApprovals from "./pages/admin/PendingApprovals";
import Analytics from "./pages/admin/Analytics";
import SchemesManager from "./pages/admin/SchemesManager";
import NotificationsLog from "./pages/admin/NotificationsLog";
import CitizenHome from "./pages/citizen/Home";
import ProjectDetail from "./pages/citizen/ProjectDetail";
const NearbyMap = lazy(() => import("./pages/citizen/NearbyMap"));
import MySchemes from "./pages/citizen/MySchemes";
import History from "./pages/citizen/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/citizen/login" element={<CitizenLogin />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/map" element={<ProjectMap />} />
              <Route path="/admin/add" element={<AddProject />} />
              <Route path="/admin/projects" element={<AllProjects />} />
              <Route path="/admin/approvals" element={<PendingApprovals />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/schemes" element={<SchemesManager />} />
              <Route path="/admin/notifications" element={<NotificationsLog />} />
              <Route path="/citizen" element={<CitizenHome />} />
              <Route path="/citizen/project/:id" element={<ProjectDetail />} />
              <Route path="/citizen/nearby" element={<NearbyMap />} />
              <Route path="/citizen/schemes" element={<MySchemes />} />
              <Route path="/citizen/history" element={<History />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
