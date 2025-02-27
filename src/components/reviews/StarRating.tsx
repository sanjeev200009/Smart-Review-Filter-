import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  color = "text-yellow-400",
  interactive = false,
  onChange,
  className,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <div
            key={index}
            className={cn(
              "relative cursor-default transition-all",
              interactive && "cursor-pointer",
            )}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => handleClick(starValue)}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "stroke-[1.5px]",
                isFilled ? color : "text-gray-300",
              )}
              fill={isFilled ? "currentColor" : "none"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
