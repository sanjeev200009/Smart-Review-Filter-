import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, Code, Server, Shield, Smartphone } from "lucide-react";

const TestingGuide = () => {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Smart Review Filter Testing Guide</h1>
      
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="manual">Manual Testing</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="ai">AI Testing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="device">Device Testing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Manual Testing - Submitting Different Types of Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">Test Case</th>
                      <th className="border p-2 text-left">Review Content</th>
                      <th className="border p-2 text-left">Expected Result</th>
                      <th className="border p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Genuine Review</td>
                      <td className="border p-2 italic">"Great product! Works perfectly and battery life is excellent."</td>
                      <td className="border p-2">✅ Published</td>
                      <td className="border p-2">
                        <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText("Great product! Works perfectly and battery life is excellent.")}>Copy</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">Fake Review (Competitor Spam)</td>
                      <td className="border p-2 italic">"Worst product! Buy XYZ brand instead: www.fake-link.com"</td>
                      <td className="border p-2">🚩 Flagged for review</td>
                      <td className="border p-2">
                        <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText("Worst product! Buy XYZ brand instead: www.fake-link.com")}>Copy</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">Bot/Spam Review</td>
                      <td className="border p-2 italic">"Visit www.spamsite.com for best deals!!!!"</td>
                      <td className="border p-2">❌ Auto-Blocked</td>
                      <td className="border p-2">
                        <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText("Visit www.spamsite.com for best deals!!!!")}>Copy</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">Aggressive/False Claim</td>
                      <td className="border p-2 italic">"SCAM! DO NOT BUY! THEY STOLE MY MONEY!!!"</td>
                      <td className="border p-2">🚩 Sent for admin review</td>
                      <td className="border p-2">
                        <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText("SCAM! DO NOT BUY! THEY STOLE MY MONEY!!!")}>Copy</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2">Neutral Review</td>
                      <td className="border p-2 italic">"Performance is great, but the battery drains fast."</td>
                      <td className="border p-2">✅ Published with "Mixed Feedback" tag</td>
                      <td className="border p-2">
                        <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText("Performance is great, but the battery drains fast.")}>Copy</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>How to test:</strong> Copy each review text and paste it into the review form. Submit the review and check if the system correctly identifies and handles each type of review according to the expected result.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-blue-500" />
                <span>Database Testing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Check your database to ensure reviews are stored correctly with trust scores and status flags.</p>
                
                <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>SELECT * FROM reviews ORDER BY created_at DESC;</pre>
                </div>
                
                <p className="text-sm text-muted-foreground">Expected columns in your reviews table:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><code>id</code> - Unique identifier</li>
                  <li><code>user_id</code> - User who submitted the review</li>
                  <li><code>product_id</code> - Product being reviewed</li>
                  <li><code>rating</code> - Star rating (1-5)</li>
                  <li><code>title</code> - Review title</li>
                  <li><code>content</code> - Review text</li>
                  <li><code>status</code> - Status flag (approved, flagged, spam)</li>
                  <li><code>trust_score</code> - AI-calculated trust score (0-100)</li>
                  <li><code>sentiment</code> - Detected sentiment (positive, neutral, negative)</li>
                  <li><code>is_verified_purchase</code> - Whether the reviewer purchased the product</li>
                  <li><code>created_at</code> - Submission timestamp</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-purple-500" />
                <span>AI/Spam Detection Testing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Test your AI sentiment analysis and spam detection with this Python script:</p>
                
                <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`from textblob import TextBlob

def analyze_review(review):
    sentiment = TextBlob(review).sentiment.polarity
    if sentiment > 0.2:
        return "Positive Review ✅"
    elif sentiment < -0.2:
        return "Negative Review 🚩"
    else:
        return "Neutral Review ⚠️"

# Test cases
reviews = [
    "This product is amazing! Super fast and reliable.",
    "Worst purchase ever! Broke within a day.",
    "The product is okay, but shipping took too long."
]

for review in reviews:
    print(f"Review: {review} -> {analyze_review(review)}")`}</pre>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Expected output:</strong><br />
                    Review: This product is amazing! Super fast and reliable. -> Positive Review ✅<br />
                    Review: Worst purchase ever! Broke within a day. -> Negative Review 🚩<br />
                    Review: The product is okay, but shipping took too long. -> Neutral Review ⚠️
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground">If you see correct classifications, your AI model is working properly.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                <span>Security & Performance Testing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Tests</h3>
                
                <div className="space-y-2">
                  <p className="font-medium">XSS Attack Test:</p>
                  <div className="bg-gray-800 text-gray-200 p-2 rounded-md font-mono text-sm overflow-x-auto">
                    <code>{`<script>alert('Hacked!')</script>`}</code>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(`<script>alert('Hacked!')</script>`)}>Copy to clipboard</Button>
                  <p className="text-sm text-muted-foreground">Paste this into the review content field. If your system blocks or sanitizes this input, it's secure against XSS attacks.</p>
                </div>
                
                <div className="space-y-2 mt-4">
                  <p className="font-medium">SQL Injection Test:</p>
                  <div className="bg-gray-800 text-gray-200 p-2 rounded-md font-mono text-sm overflow-x-auto">
                    <code>Review title' OR 1=1 --</code>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(`Review title' OR 1=1 --`)}>Copy to clipboard</Button>
                  <p className="text-sm text-muted-foreground">Paste this into the review title field. If your database remains secure, your system prevents SQL injections.</p>
                </div>
                
                <h3 className="text-lg font-medium mt-6">Performance Test</h3>
                <p>Submit multiple reviews in quick succession to test system performance under load.</p>
                <p className="text-sm text-muted-foreground">For automated load testing, consider using tools like JMeter or k6.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="device" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-500" />
                <span>Browser & Device Testing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Test your review system on these platforms:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Mobile Devices</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>iOS (iPhone, iPad)</li>
                      <li>Android (various screen sizes)</li>
                      <li>Check touch interactions</li>
                      <li>Test image uploads from mobile</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Desktop Browsers</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Chrome</li>
                      <li>Firefox</li>
                      <li>Safari</li>
                      <li>Edge</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mt-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Responsive Design Checklist</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                        <li>Review form adapts to different screen sizes</li>
                        <li>Review cards display properly on mobile</li>
                        <li>Filter controls are usable on small screens</li>
                        <li>Star rating is easy to interact with on touch devices</li>
                        <li>Admin moderation panel is functional on tablets</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 bg-green-50 border border-green-200 rounded-md p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Final Testing Checklist</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <span>Submit various types of reviews to test filtering</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <span>Verify trust scores are calculated correctly</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <span>Test admin moderation workflow</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <span>Check security against XSS and SQL injection</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <span>Verify responsive design on multiple devices</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestingGuide;