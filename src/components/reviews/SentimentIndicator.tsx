import React from "react";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";

export type SentimentType = "positive" | "neutral" | "negative";

interface SentimentIndicatorProps {
  sentiment: SentimentType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const SentimentIndicator = ({
  sentiment,
  size = "md",
  showLabel = false,
  className,
}: SentimentIndicatorProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const config = {
    positive: {
      icon: <ThumbsUp className={sizeClasses[size]} />,
      label: "Positive",
      color: "text-green-600 bg-green-50",
    },
    neutral: {
      icon: <Minus className={sizeClasses[size]} />,
      label: "Neutral",
      color: "text-gray-600 bg-gray-50",
    },
    negative: {
      icon: <ThumbsDown className={sizeClasses[size]} />,
      label: "Negative",
      color: "text-red-600 bg-red-50",
    },
  };

  const { icon, label, color } = config[sentiment];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1",
        color,
        className,
      )}
    >
      {icon}
      {showLabel && <span className="text-xs font-medium">{label}</span>}
    </div>
  );
};

export default SentimentIndicator;
