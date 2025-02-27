import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";

export type TrustLevel = "high" | "medium" | "low" | "suspicious";

interface TrustBadgeProps {
  level: TrustLevel;
  score?: number;
  showScore?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const TrustBadge = ({
  level,
  score,
  showScore = false,
  size = "md",
  className,
}: TrustBadgeProps) => {
  const badgeConfig = {
    high: {
      icon: <ShieldCheck className="h-3 w-3 mr-1" />,
      text: "Trusted",
      variant: "default",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    medium: {
      icon: <ShieldCheck className="h-3 w-3 mr-1" />,
      text: "Likely Authentic",
      variant: "secondary",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    low: {
      icon: <AlertTriangle className="h-3 w-3 mr-1" />,
      text: "Low Trust",
      variant: "outline",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
    suspicious: {
      icon: <ShieldAlert className="h-3 w-3 mr-1" />,
      text: "Suspicious",
      variant: "destructive",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
    },
  };

  const config = badgeConfig[level];
  const sizeClasses = size === "sm" ? "text-[10px] px-1.5 py-0" : "";

  return (
    <Badge
      variant="outline"
      className={cn(
        config.bgColor,
        config.textColor,
        "font-medium flex items-center",
        sizeClasses,
        className,
      )}
    >
      {config.icon}
      {config.text}
      {showScore && score !== undefined && (
        <span className="ml-1 opacity-80">{score}%</span>
      )}
    </Badge>
  );
};

export default TrustBadge;
