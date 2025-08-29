import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-primary mb-4">404</CardTitle>
          <CardDescription className="text-xl">Oops! Page not found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist or has been moved.</p>
          <div className="space-y-3">
            <Button onClick={() => navigate("/")} className="w-full cursor-pointer">
              Go Home
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)} className="w-full cursor-pointer">
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
