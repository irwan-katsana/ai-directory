import { tools } from "./data/tools";
import { useStatus } from "./hooks/use-status";
import { ToolCard } from "./components/tool-card";
import { Activity, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

function App() {
  const { tools: monitoredTools, isChecking, refresh } = useStatus(tools);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">KATSANA AI Tools Directory</h1>
          </div>
          <p className="text-muted-foreground mb-4">
            Discover our suite of AI-powered tools with availability status
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={isChecking}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {monitoredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} isChecking={isChecking} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;