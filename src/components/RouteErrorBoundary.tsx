import { useRouteError } from "react-router";

export default function RouteErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold text-destructive mb-4">Oops! Something went wrong</h1>
        <p className="text-muted-foreground mb-6">
          We're sorry, but something unexpected happened. Please try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Refresh Page
        </button>
        {process.env.NODE_ENV === "development" && error && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground">Error Details (Development)</summary>
            <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">{error.toString()}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
