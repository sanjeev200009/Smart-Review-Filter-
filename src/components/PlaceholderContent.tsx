import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { InfoIcon } from "lucide-react";

interface PlaceholderContentProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const PlaceholderContent = ({
  title = "Waiting for Requirements",
  message = "This component is a placeholder. Specific feature requirements are needed to build the complete UI for the Smart Review Filter System.",
  icon = <InfoIcon className="h-12 w-12 text-blue-500" />,
  actionLabel = "Learn More",
  onAction = () => console.log("Action clicked"),
}: PlaceholderContentProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full bg-gray-50 p-4">
      <Card className="w-full max-w-[600px] shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pb-2">
          <div className="rounded-full bg-blue-50 p-3">{icon}</div>
          <CardTitle className="text-xl font-bold text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">{message}</p>
          <Button onClick={onAction} className="mx-auto">
            {actionLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderContent;
