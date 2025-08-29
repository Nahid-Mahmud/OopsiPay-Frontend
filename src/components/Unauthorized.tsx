import { ShieldAlert, Lock, ArrowLeft, LogIn } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background via-background to-muted flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <Card className="overflow-hidden shadow-lg border-border/60">
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-muted">
              <Lock className="size-7" aria-hidden />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                401
              </Badge>
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <ShieldAlert className="size-4" />
                <span>Unauthorized</span>
              </div>
            </div>
            <CardTitle className="text-2xl">You don’t have access to this page</CardTitle>
            <CardDescription>
              Please sign in with the correct account or go back to a page you can access.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="text-sm text-muted-foreground list-disc pl-5">
              <li>Your session may have expired.</li>
              <li>You might need different permissions.</li>
            </ul>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button variant="secondary" onClick={handleBack} className="rounded-2xl cursor-pointer">
              <ArrowLeft className="mr-2 size-4" /> Go back
            </Button>
            <Button asChild className="rounded-2xl">
              <Link to="/login">
                <LogIn className="mr-2 size-4" /> Sign in
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <Link to="/">Home</Link>
            </Button>
          </CardFooter>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          If you believe this is a mistake, contact your administrator.
        </p>
      </div>
    </div>
  );
}
