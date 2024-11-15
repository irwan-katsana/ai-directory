import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface StatusBadgeProps {
  isOnline?: boolean;
  isChecking?: boolean;
}

export function StatusBadge({ isOnline, isChecking }: StatusBadgeProps) {
  if (isChecking) {
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
        <Loader2 className="h-3 w-3 animate-spin mr-1" />
        Checking
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className={cn(
        "transition-colors",
        isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
      )}
    >
      {isOnline ? "Available" : "Unavailable"}
    </Badge>
  );
}