import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Flag, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import StarRating from "./StarRating";
import TrustBadge, { TrustLevel } from "./TrustBadge";
import SentimentIndicator, { SentimentType } from "./SentimentIndicator";

export interface ReviewData {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isVerifiedPurchase?: boolean;
  };
  rating: number;
  title?: string;
  content: string;
  date: string;
  helpfulCount: number;
  unhelpfulCount: number;
  images?: string[];
  trustLevel: TrustLevel;
  trustScore?: number;
  sentiment: SentimentType;
  userVote?: "helpful" | "unhelpful" | null;
}

interface ReviewCardProps {
  review: ReviewData;
  onHelpful?: (id: string) => void;
  onUnhelpful?: (id: string) => void;
  onReport?: (id: string) => void;
  onReply?: (id: string) => void;
  className?: string;
  isAdmin?: boolean;
}

const ReviewCard = ({
  review,
  onHelpful,
  onUnhelpful,
  onReport,
  onReply,
  className,
  isAdmin = false,
}: ReviewCardProps) => {
  const {
    id,
    author,
    rating,
    title,
    content,
    date,
    helpfulCount,
    unhelpfulCount,
    images,
    trustLevel,
    trustScore,
    sentiment,
    userVote,
  } = review;

  const handleHelpful = () => onHelpful && onHelpful(id);
  const handleUnhelpful = () => onUnhelpful && onUnhelpful(id);
  const handleReport = () => onReport && onReport(id);
  const handleReply = () => onReply && onReply(id);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              {author.avatar && (
                <AvatarImage src={author.avatar} alt={author.name} />
              )}
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{author.name}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{date}</span>
                {author.isVerifiedPurchase && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrustBadge
              level={trustLevel}
              score={trustScore}
              showScore={isAdmin}
            />
            <SentimentIndicator sentiment={sentiment} size="sm" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="mb-1 flex items-center justify-between">
          <StarRating rating={rating} size="sm" />
          {title && <h4 className="font-medium mt-2">{title}</h4>}
        </div>
        <p className="text-sm mt-2">{content}</p>
        {images && images.length > 0 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review image ${index + 1}`}
                className="h-16 w-16 object-cover rounded-md"
              />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs gap-1",
              userVote === "helpful" && "bg-green-50 text-green-700",
            )}
            onClick={handleHelpful}
          >
            <ThumbsUp className="h-3 w-3" />
            <span>Helpful ({helpfulCount})</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs gap-1",
              userVote === "unhelpful" && "bg-red-50 text-red-700",
            )}
            onClick={handleUnhelpful}
          >
            <ThumbsDown className="h-3 w-3" />
            <span>Unhelpful ({unhelpfulCount})</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              onClick={handleReply}
            >
              <MessageSquare className="h-3 w-3" />
              <span>Reply</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-red-600"
            onClick={handleReport}
          >
            <Flag className="h-3 w-3" />
            <span>Report</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
