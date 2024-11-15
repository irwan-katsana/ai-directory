import { useState, useEffect } from 'react';
import type { Tool } from '@/types/tool';

export function useUptime(tools: Tool[]) {
  const [monitoredTools, setMonitoredTools] = useState<Tool[]>(tools);

  useEffect(() => {
    const checkStatus = async () => {
      const updatedTools = await Promise.all(
        tools.map(async (tool) => {
          try {
            const response = await fetch(tool.url, { mode: 'no-cors' });
            return {
              ...tool,
              isOnline: true,
              lastChecked: new Date(),
            };
          } catch (error) {
            return {
              ...tool,
              isOnline: false,
              lastChecked: new Date(),
            };
          }
        })
      );
      setMonitoredTools(updatedTools);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tools]);

  return monitoredTools;
}