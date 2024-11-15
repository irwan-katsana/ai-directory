import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import type { Tool } from "@/types/tool";
import { ExternalLink } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  isChecking: boolean;
}

export function ToolCard({ tool, isChecking }: ToolCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary/80"
            >
              {tool.name}
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardTitle>
          <StatusBadge isOnline={tool.isOnline} isChecking={isChecking} />
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {tool.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {tool.url}
        </p>
      </CardContent>
    </Card>
  );
}