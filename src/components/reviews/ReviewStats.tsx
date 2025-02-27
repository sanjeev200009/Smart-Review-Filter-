import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

interface ReviewStatsProps {
  averageRating: number;
  totalReviews: number;
  verifiedReviews: number;
  distribution: RatingDistribution[];
  className?: string;
}

const ReviewStats = ({
  averageRating,
  totalReviews,
  verifiedReviews,
  distribution,
  className,
}: ReviewStatsProps) => {
  const verifiedPercentage =
    Math.round((verifiedReviews / totalReviews) * 100) || 0;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Review Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={cn(
                    "w-4 h-4",
                    star <= Math.round(averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 fill-current",
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {verifiedPercentage}% verified purchases
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-2">
              {distribution
                .sort((a, b) => b.rating - a.rating)
                .map((item) => (
                  <div key={item.rating} className="flex items-center gap-2">
                    <div className="text-sm w-8">{item.rating} ★</div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground w-12">
                      {item.percentage}%
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewStats;
