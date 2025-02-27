import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImagePlus, X, Loader2 } from "lucide-react";
import StarRating from "./StarRating";

const reviewSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  content: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000),
  rating: z.number().min(1, "Please select a rating").max(5),
  images: z.array(z.string()).optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  onSubmit: (data: ReviewFormValues) => void;
  isSubmitting?: boolean;
  productName?: string;
  className?: string;
}

const ReviewForm = ({
  onSubmit,
  isSubmitting = false,
  productName = "Product",
  className,
}: ReviewFormProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: "",
      content: "",
      rating: 0,
      images: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert files to preview URLs
    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
    }

    // Update form and preview
    const currentImages = form.getValues("images") || [];
    form.setValue("images", [...currentImages, ...newImages]);
    setPreviewImages([...previewImages, ...newImages]);
  };

  const removeImage = (index: number) => {
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);
    form.setValue("images", updatedImages);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Write a Review for {productName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <StarRating
                      rating={field.value}
                      interactive={true}
                      size="lg"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Summarize your experience" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience with this product..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your review helps other shoppers make better decisions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="block mb-2">
                Add Photos (Optional)
              </FormLabel>
              <div className="flex flex-wrap gap-3 mb-3">
                {previewImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-20 w-20 rounded-md overflow-hidden border"
                  >
                    <img
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0 h-5 w-5 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <label className="flex items-center justify-center h-20 w-20 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">
                      Add Photo
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            <CardFooter className="px-0 pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
