import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsErrorStateProps {
  hasError: boolean;
}

export default function AnalyticsErrorState({ hasError }: AnalyticsErrorStateProps) {
  if (!hasError) return null;

  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="pt-6">
        <p className="text-red-600">Failed to load analytics data. Please try again later.</p>
      </CardContent>
    </Card>
  );
}
