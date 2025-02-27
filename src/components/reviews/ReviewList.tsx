import React from "react";
import { cn } from "@/lib/utils";
import ReviewCard, { ReviewData } from "./ReviewCard";

interface ReviewListProps {
  reviews: ReviewData[];
  isLoading?: boolean;
  emptyMessage?: string;
  onHelpful?: (id: string) => void;
  onUnhelpful?: (id: string) => void;
  onReport?: (id: string) => void;
  onReply?: (id: string) => void;
  className?: string;
  isAdmin?: boolean;
}

const ReviewList = ({
  reviews,
  isLoading = false,
  emptyMessage = "No reviews found",
  onHelpful,
  onUnhelpful,
  onReport,
  onReply,
  className,
  isAdmin = false,
}: ReviewListProps) => {
  if (isLoading) {
    return (
      <div className={cn("w-full space-y-4", className)}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full h-[200px] rounded-lg bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div
        className={cn(
          "w-full p-8 text-center text-muted-foreground bg-muted/30 rounded-lg",
          className,
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onHelpful={onHelpful}
          onUnhelpful={onUnhelpful}
          onReport={onReport}
          onReply={onReply}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default ReviewList;
