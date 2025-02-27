import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReviewData } from "./ReviewCard";
import ReviewList from "./ReviewList";
import { CheckCircle, XCircle, AlertTriangle, BarChart3 } from "lucide-react";

// Mock data for demonstration
const MOCK_FLAGGED_REVIEWS: ReviewData[] = [
  {
    id: "4",
    author: {
      name: "Suspicious User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=suspicious",
      isVerifiedPurchase: false,
    },
    rating: 5,
    title: "Best product ever buy now!!!",
    content:
      "AMAZING PRODUCT!!! Must buy now! Discount code in bio! Check out my page for more reviews and amazing deals on similar products!",
    date: "2023-05-01",
    helpfulCount: 1,
    unhelpfulCount: 12,
    trustLevel: "suspicious",
    trustScore: 15,
    sentiment: "positive",
    userVote: null,
  },
  {
    id: "5",
    author: {
      name: "Potential Bot",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bot",
      isVerifiedPurchase: false,
    },
    rating: 1,
    title: "Terrible product avoid at all costs",
    content:
      "This is the worst product I've ever used. Avoid at all costs! Check out [competitor product] instead, it's much better and cheaper!",
    date: "2023-04-28",
    helpfulCount: 0,
    unhelpfulCount: 8,
    trustLevel: "suspicious",
    trustScore: 20,
    sentiment: "negative",
    userVote: null,
  },
  {
    id: "6",
    author: {
      name: "Reported User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=reported",
      isVerifiedPurchase: true,
    },
    rating: 2,
    title: "Contains inappropriate content",
    content:
      "This product is not good. The customer service is terrible and [inappropriate content redacted]. I would not recommend this to anyone.",
    date: "2023-04-25",
    helpfulCount: 3,
    unhelpfulCount: 5,
    trustLevel: "low",
    trustScore: 40,
    sentiment: "negative",
    userVote: null,
  },
];

const AdminModeration = () => {
  // Use localStorage to persist moderation state
  const savedFlagged = localStorage.getItem("reviewFilterFlaggedReviews");
  const savedApproved = localStorage.getItem("reviewFilterApprovedReviews");
  const savedRejected = localStorage.getItem("reviewFilterRejectedReviews");

  const [flaggedReviews, setFlaggedReviews] = useState<ReviewData[]>(
    savedFlagged ? JSON.parse(savedFlagged) : MOCK_FLAGGED_REVIEWS,
  );
  const [approvedReviews, setApprovedReviews] = useState<ReviewData[]>(
    savedApproved ? JSON.parse(savedApproved) : [],
  );
  const [rejectedReviews, setRejectedReviews] = useState<ReviewData[]>(
    savedRejected ? JSON.parse(savedRejected) : [],
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "reviewFilterFlaggedReviews",
      JSON.stringify(flaggedReviews),
    );
    localStorage.setItem(
      "reviewFilterApprovedReviews",
      JSON.stringify(approvedReviews),
    );
    localStorage.setItem(
      "reviewFilterRejectedReviews",
      JSON.stringify(rejectedReviews),
    );
  }, [flaggedReviews, approvedReviews, rejectedReviews]);

  const handleApprove = (id: string) => {
    const reviewToApprove = flaggedReviews.find((review) => review.id === id);
    if (reviewToApprove) {
      setFlaggedReviews(flaggedReviews.filter((review) => review.id !== id));
      setApprovedReviews([
        ...approvedReviews,
        { ...reviewToApprove, trustLevel: "medium" },
      ]);
    }
  };

  const handleReject = (id: string) => {
    const reviewToReject = flaggedReviews.find((review) => review.id === id);
    if (reviewToReject) {
      setFlaggedReviews(flaggedReviews.filter((review) => review.id !== id));
      setRejectedReviews([...rejectedReviews, reviewToReject]);
    }
  };

  const handleReply = (id: string) => {
    // In a real app, you would open a reply dialog
    console.log("Reply to review:", id);
    alert(`Opening reply dialog for review ${id}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Review Moderation</h1>
        <Button variant="outline" className="gap-2">
          <BarChart3 className="h-4 w-4" />
          <span>Analytics</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Pending Moderation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{flaggedReviews.length}</div>
            <p className="text-sm text-muted-foreground">
              Reviews flagged by AI or users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Approved</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{approvedReviews.length}</div>
            <p className="text-sm text-muted-foreground">
              Reviews approved in the last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span>Rejected</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{rejectedReviews.length}</div>
            <p className="text-sm text-muted-foreground">
              Reviews rejected in the last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="flagged" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="flagged" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Flagged</span>
            <Badge variant="secondary" className="ml-1">
              {flaggedReviews.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Approved</span>
            <Badge variant="secondary" className="ml-1">
              {approvedReviews.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            <XCircle className="h-4 w-4" />
            <span>Rejected</span>
            <Badge variant="secondary" className="ml-1">
              {rejectedReviews.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flagged">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Review Moderation Guidelines</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Reviews flagged by our AI system need manual verification.
                  Check for spam, inappropriate content, or fake reviews before
                  approving.
                </p>
              </div>
            </div>
          </div>

          <ReviewList
            reviews={flaggedReviews}
            isAdmin={true}
            onReply={handleReply}
            emptyMessage="No reviews pending moderation"
          />

          {flaggedReviews.length > 0 && (
            <div className="fixed bottom-4 right-4 flex gap-2">
              <Button
                variant="destructive"
                onClick={() => handleReject(flaggedReviews[0].id)}
                className="gap-2"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject</span>
              </Button>
              <Button
                variant="default"
                onClick={() => handleApprove(flaggedReviews[0].id)}
                className="gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Approve</span>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved">
          <ReviewList
            reviews={approvedReviews}
            isAdmin={true}
            onReply={handleReply}
            emptyMessage="No approved reviews yet"
          />
        </TabsContent>

        <TabsContent value="rejected">
          <ReviewList
            reviews={rejectedReviews}
            isAdmin={true}
            onReply={handleReply}
            emptyMessage="No rejected reviews yet"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminModeration;
