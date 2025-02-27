import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterOption = {
  id: string;
  label: string;
};

export type SortOption = {
  id: string;
  label: string;
};

interface ReviewFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: string[]) => void;
  onSortChange: (sortBy: string) => void;
  filterOptions: FilterOption[];
  sortOptions: SortOption[];
  activeFilters?: string[];
  activeSortOption?: string;
  className?: string;
}

const ReviewFilter = ({
  onSearch,
  onFilterChange,
  onSortChange,
  filterOptions,
  sortOptions,
  activeFilters = [],
  activeSortOption = "newest",
  className,
}: ReviewFilterProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter((id) => id !== filterId)
      : [...activeFilters, filterId];
    onFilterChange(newFilters);
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <form
          onSubmit={handleSearch}
          className="relative flex-grow flex items-center"
        >
          <Input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-2",
              showFilters && "bg-secondary text-secondary-foreground",
            )}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {activeFilters.length > 0 && (
              <span className="ml-1 rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs">
                {activeFilters.length}
              </span>
            )}
          </Button>
          <Select value={activeSortOption} onValueChange={onSortChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
          {filterOptions.map((option) => {
            const isActive = activeFilters.includes(option.id);
            return (
              <Button
                key={option.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={cn(
                  "gap-2",
                  isActive && "bg-primary text-primary-foreground",
                )}
                onClick={() => toggleFilter(option.id)}
              >
                {isActive && <Check className="h-3 w-3" />}
                {option.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReviewFilter;
