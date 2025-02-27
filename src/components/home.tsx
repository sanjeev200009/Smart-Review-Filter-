import React from "react";
import { Helmet } from "react-helmet";
import {
  ShoppingBag,
  Star,
  Filter,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface HomeProps {
  title?: string;
  description?: string;
}

const Home = ({
  title = "Smart Review Filter System",
  description = "AI-powered review filtering system for e-commerce websites",
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
              {title}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                Dashboard
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                Products
              </button>
              <Link
                to="/reviews"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Reviews
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Review Analytics</h2>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold mb-2">4.7</p>
            <p className="text-sm text-gray-500">Average Rating</p>
            <div className="h-2 bg-gray-200 rounded-full mt-4">
              <div className="h-2 bg-green-500 rounded-full w-[85%]"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>5</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Review Volume</h2>
              <MessageSquare className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold mb-2">1,248</p>
            <p className="text-sm text-gray-500">Total Reviews</p>
            <div className="flex items-center mt-4">
              <span className="text-green-500 text-sm font-medium">+12%</span>
              <span className="text-xs text-gray-500 ml-2">
                from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">AI Detection</h2>
              <Filter className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold mb-2">98%</p>
            <p className="text-sm text-gray-500">Authentic Reviews</p>
            <div className="flex items-center mt-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs text-gray-500">
                24 flagged for moderation
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Smart Review Filter System
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our AI-powered review filtering system helps users identify
            authentic product reviews through sentiment analysis and spam
            detection, improving shopping decision confidence.
          </p>
          <Link to="/reviews">
            <Button size="lg" className="gap-2">
              <span>Go to Review Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">User Features</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Review Display Component</p>
                    <p className="text-sm text-gray-500">
                      Shows reviews with trust scores and sentiment indicators
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Filter Controls</p>
                    <p className="text-sm text-gray-500">
                      Sort by newest, highest rated, or most helpful reviews
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Review Submission Form</p>
                    <p className="text-sm text-gray-500">
                      Text input, star rating, and optional image upload
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Admin Features</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-purple-600">
                      1
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Admin Moderation Panel</p>
                    <p className="text-sm text-gray-500">
                      Dashboard for approving/rejecting flagged reviews
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-purple-600">
                      2
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Analytics Dashboard</p>
                    <p className="text-sm text-gray-500">
                      Review trends and sentiment analysis over time
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-purple-600">
                      3
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">AI Integration</p>
                    <p className="text-sm text-gray-500">
                      Backend connection to sentiment analysis and spam
                      detection
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
