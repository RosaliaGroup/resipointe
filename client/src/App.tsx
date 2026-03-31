import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CampaignPage from "./pages/CampaignPage";
import CollaborationHub from "./pages/CollaborationHub";
import SocialGenerator from "./pages/SocialGenerator";
import FloorPlans from "./pages/FloorPlans";
import BookTour from "./pages/BookTour";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/campaigns/:id" component={CampaignPage} />
      <Route path="/collaborate" component={CollaborationHub} />
      <Route path="/social-generator" component={SocialGenerator} />
      <Route path="/floor-plans" component={FloorPlans} />
      <Route path="/book-tour" component={BookTour} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
