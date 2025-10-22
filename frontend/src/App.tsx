import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import Portfolio from "@/pages/portfolio";
import Analytics from "@/pages/analytics";
import Calculator from "@/pages/calculator";
import Contracts from "@/pages/contracts";
import Story from "@/pages/story";
//import Invest from "@/pages/invest";
import Ecosystem from "@/pages/ecosystem";
import Auth from "@/pages/auth";
// import Wealth from "@/pages/wealth";
import NotFound from "@/pages/not-found";


interface AppProps {
  apiUrl: string;
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/properties" component={Properties} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/contracts" component={Contracts} />
          <Route path="/story" component={Story} />
          {/* <Route path="/invest" component={Invest} /> */}
          <Route path="/partner-ecosystem" component={Ecosystem}/>
         <Route path="/auth" component={Auth} />
          {/* <Route path="/wealth-management" component={Wealth} /> */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App({ apiUrl }: AppProps) {
  console.log("API URL inside App:", apiUrl); // Now you can access it

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
