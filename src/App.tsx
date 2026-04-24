import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Landing page
import Index from "./pages/Index.tsx";

// Auth pages (from pages/pages/)
import Login from "./pages/pages/Login.tsx";
import Register from "./pages/pages/Register.tsx";

// Public chat (embeddable chatbot)
import Chat from "./pages/pages/Chat.tsx";

// CRM Dashboard pages (from pages/pages/)
import Dashboard from "./pages/pages/Dashboard.tsx";
import Conversations from "./pages/pages/Conversations.tsx";
import Leads from "./pages/pages/Leads.tsx";
import Plans from "./pages/pages/Plans.tsx";
import SettingsPage from "./pages/pages/SettingsPage.tsx";

// Shared components
import DashboardLayout from "./components/layout/DashboardLayout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter basename="/Agent-X/">
        <Routes>
          {/* ── Public routes ─────────────────────────────── */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public chatbot embed — no auth required */}
          <Route path="/chat" element={<Chat />} />

          {/* ── Protected dashboard routes ─────────────────── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/conversations"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Conversations />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/leads"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Leads />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/plans"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Plans />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* ── 404 catch-all ─────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
