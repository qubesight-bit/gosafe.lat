import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import MedicationInteractions from "./pages/MedicationInteractions";
import SubstanceEducation from "./pages/SubstanceEducation";
import SubstanceDetail from "./pages/SubstanceDetail";
import EmergencyResources from "./pages/EmergencyResources";
import SymptomChecker from "./pages/SymptomChecker";
import CombinationChecker from "./pages/CombinationChecker";
import InteractionMatrix from "./pages/InteractionMatrix";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/interactions" element={<MedicationInteractions />} />
                <Route path="/substances" element={<SubstanceEducation />} />
                <Route path="/substances/:id" element={<SubstanceDetail />} />
                <Route path="/combinations" element={<CombinationChecker />} />
                <Route path="/matrix" element={<InteractionMatrix />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/emergency" element={<EmergencyResources />} />
                <Route path="/symptom-checker" element={<SymptomChecker />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
