import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReviewList from "./ReviewList";
import ReviewFilter from "./ReviewFilter";
import ReviewStats from "./ReviewStats";
import ReviewForm from "./ReviewForm";
import { ReviewData } from "./ReviewCard";

// Mock data for demonstration
const MOCK_REVIEWS: ReviewData[] = [
  {
    id: "1",
    author: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: "Excellent product, exceeded expectations",
    content:
      "This product is amazing! I've been using it for a month now and it has completely transformed my workflow. The quality is outstanding and it's very durable.",
    date: "2023-05-15",
    helpfulCount: 24,
    unhelpfulCount: 2,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
    ],
    trustLevel: "high",
    trustScore: 95,
    sentiment: "positive",
    userVote: null,
  },
  {
    id: "2",
    author: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      isVerifiedPurchase: true,
    },
    rating: 4,
    title: "Good product with minor issues",
    content:
      "Overall I'm satisfied with this purchase. The product works as described, but there are a few minor issues that could be improved. The setup was a bit complicated.",
    date: "2023-05-10",
    helpfulCount: 15,
    unhelpfulCount: 3,
    trustLevel: "medium",
    trustScore: 82,
    sentiment: "neutral",
    userVote: null,
  },
  {
    id: "3",
    author: {
      name: "Robert Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      isVerifiedPurchase: false,
    },
    rating: 2,
    title: "Disappointed with quality",
    content:
      "I was really disappointed with this product. It didn't meet my expectations at all. The materials feel cheap and it stopped working after just two weeks.",
    date: "2023-05-05",
    helpfulCount: 8,
    unhelpfulCount: 4,
    trustLevel: "low",
    trustScore: 45,
    sentiment: "negative",
    userVote: null,
  },
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
];

const FILTER_OPTIONS = [
  { id: "verified", label: "Verified Purchases" },
  { id: "with-images", label: "With Images" },
  { id: "5-star", label: "5 Star" },
  { id: "4-star", label: "4 Star" },
  { id: "3-star", label: "3 Star" },
  { id: "2-star", label: "2 Star" },
  { id: "1-star", label: "1 Star" },
  { id: "positive", label: "Positive" },
  { id: "negative", label: "Negative" },
  { id: "high-trust", label: "High Trust" },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
  { id: "highest", label: "Highest Rated" },
  { id: "lowest", label: "Lowest Rated" },
  { id: "most-helpful", label: "Most Helpful" },
];

const ReviewDashboard = () => {
  const [reviews, setReviews] = useState<ReviewData[]>(MOCK_REVIEWS);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeSortOption, setActiveSortOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate review statistics
  const totalReviews = reviews.length;
  const verifiedReviews = reviews.filter(
    (review) => review.author.isVerifiedPurchase,
  ).length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

  // Calculate rating distribution
  const distribution = [1, 2, 3, 4, 5].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length;
    const percentage = Math.round((count / totalReviews) * 100) || 0;
    return { rating, count, percentage };
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would filter the reviews based on the query
    console.log("Searching for:", query);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    // In a real app, you would filter the reviews based on the selected filters
    console.log("Filters changed:", filters);
  };

  const handleSortChange = (sortBy: string) => {
    setActiveSortOption(sortBy);
    // In a real app, you would sort the reviews based on the selected option
    console.log("Sort changed:", sortBy);
  };

  const handleHelpful = (id: string) => {
    // In a real app, you would send this to the server
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              helpfulCount:
                review.userVote === "helpful"
                  ? review.helpfulCount - 1
                  : review.helpfulCount + 1,
              userVote: review.userVote === "helpful" ? null : "helpful",
              unhelpfulCount:
                review.userVote === "unhelpful"
                  ? review.unhelpfulCount - 1
                  : review.unhelpfulCount,
            }
          : review,
      ),
    );
  };

  const handleUnhelpful = (id: string) => {
    // In a real app, you would send this to the server
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              unhelpfulCount:
                review.userVote === "unhelpful"
                  ? review.unhelpfulCount - 1
                  : review.unhelpfulCount + 1,
              userVote: review.userVote === "unhelpful" ? null : "unhelpful",
              helpfulCount:
                review.userVote === "helpful"
                  ? review.helpfulCount - 1
                  : review.helpfulCount,
            }
          : review,
      ),
    );
  };

  const handleReport = (id: string) => {
    // In a real app, you would send this to the server
    console.log("Reported review:", id);
    alert(`Review ${id} has been reported and will be reviewed by our team.`);
  };

  const handleReviewSubmit = (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send this to the server
      console.log("Submitted review:", data);

      // Add the new review to the list
      const newReview: ReviewData = {
        id: `new-${Date.now()}`,
        author: {
          name: "You",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
          isVerifiedPurchase: true,
        },
        rating: data.rating,
        title: data.title,
        content: data.content,
        date: new Date().toISOString().split("T")[0],
        helpfulCount: 0,
        unhelpfulCount: 0,
        images: data.images,
        trustLevel: "high",
        trustScore: 90,
        sentiment:
          data.rating > 3
            ? "positive"
            : data.rating === 3
              ? "neutral"
              : "negative",
        userVote: null,
      };

      setReviews([newReview, ...reviews]);
      setIsSubmitting(false);
      alert("Your review has been submitted successfully!");
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Product Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <ReviewStats
            averageRating={averageRating}
            totalReviews={totalReviews}
            verifiedReviews={verifiedReviews}
            distribution={distribution}
          />
        </div>
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(
                      (reviews.filter((r) => r.trustLevel !== "suspicious")
                        .length /
                        totalReviews) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Authentic Reviews
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{
                      width: `${(reviews.filter((r) => r.trustLevel !== "suspicious").length / totalReviews) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>
                    {
                      reviews.filter((r) => r.trustLevel === "suspicious")
                        .length
                    }{" "}
                    flagged for moderation
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="read" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="read">Read Reviews</TabsTrigger>
          <TabsTrigger value="write">Write a Review</TabsTrigger>
        </TabsList>

        <TabsContent value="read" className="space-y-6">
          <ReviewFilter
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            filterOptions={FILTER_OPTIONS}
            sortOptions={SORT_OPTIONS}
            activeFilters={activeFilters}
            activeSortOption={activeSortOption}
          />

          <ReviewList
            reviews={reviews}
            onHelpful={handleHelpful}
            onUnhelpful={handleUnhelpful}
            onReport={handleReport}
          />
        </TabsContent>

        <TabsContent value="write">
          <ReviewForm
            onSubmit={handleReviewSubmit}
            isSubmitting={isSubmitting}
            productName="Wireless Headphones"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewDashboard;
