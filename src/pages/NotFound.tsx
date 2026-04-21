import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center shadow-lg shadow-foreground/20 mx-auto mb-8">
          <span className="text-background text-2xl font-black">AX</span>
        </div>
        <h1 className="mb-4 text-6xl font-black tracking-tight">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">This transmission was lost in space.</p>
        <Button asChild className="rounded-xl h-12 px-8 font-bold">
          <Link to="/">
            Return to Mission Control
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
