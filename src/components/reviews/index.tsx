import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewDashboard from "./ReviewDashboard";
import AdminModeration from "./AdminModeration";
import TestingGuide from "./TestingGuide";
import { Button } from "@/components/ui/button";
import { Beaker } from "lucide-react";

const SmartReviewFilter = () => {
  // Use localStorage to persist the user role between page refreshes
  const savedRole = localStorage.getItem("reviewFilterUserRole") || "user";
  const [userRole, setUserRole] = useState<"user" | "admin" | "testing">(
    savedRole as "user" | "admin" | "testing",
  );

  const toggleRole = () => {
    let newRole: "user" | "admin" | "testing";
    if (userRole === "user") newRole = "admin";
    else if (userRole === "admin") newRole = "testing";
    else newRole = "user";

    setUserRole(newRole);
    localStorage.setItem("reviewFilterUserRole", newRole);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Smart Review Filter System</h1>
          <div className="flex items-center gap-3">
            {userRole === "testing" && (
              <div className="flex items-center gap-1 text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                <Beaker className="h-4 w-4" />
                <span className="text-xs font-medium">Testing Mode</span>
              </div>
            )}
            <Button onClick={toggleRole} variant="outline" size="sm">
              Switch to{" "}
              {userRole === "user"
                ? "Admin"
                : userRole === "admin"
                  ? "Testing"
                  : "User"}{" "}
              View
            </Button>
          </div>
        </div>
      </header>

      <main className="py-6">
        {userRole === "user" ? (
          <ReviewDashboard />
        ) : userRole === "admin" ? (
          <AdminModeration />
        ) : (
          <TestingGuide />
        )}
      </main>
    </div>
  );
};

export default SmartReviewFilter;
