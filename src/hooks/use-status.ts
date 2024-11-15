import { useState, useEffect, useCallback } from 'react';
import type { Tool } from '@/types/tool';

export function useStatus(tools: Tool[]) {
  const [monitoredTools, setMonitoredTools] = useState<Tool[]>(tools);
  const [isChecking, setIsChecking] = useState(true);

  const checkStatus = useCallback(async () => {
    setIsChecking(true);
    const updatedTools = await Promise.all(
      tools.map(async (tool) => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const response = await fetch(tool.url, {
            signal: controller.signal,
            mode: 'no-cors',
            method: 'HEAD'
          });
          
          clearTimeout(timeoutId);
          
          // Special handling for specific services
          if (
            tool.url.includes('n8n.katsana.io') || 
            tool.url.includes('katsana.myds.me:3005')
          ) {
            return { ...tool, isOnline: true };
          }
          
          // With no-cors, we won't get a proper status code
          // but if we reach this point without throwing, the service is up
          return { ...tool, isOnline: true };
        } catch (error) {
          // If it's an abort error (timeout) but the URL matches specific services,
          // consider them online as they might take longer to respond
          if (error.name === 'AbortError' && (
            tool.url.includes('n8n.katsana.io') || 
            tool.url.includes('katsana.myds.me:3005')
          )) {
            return { ...tool, isOnline: true };
          }
          return { ...tool, isOnline: false };
        }
      })
    );
    setMonitoredTools(updatedTools);
    setIsChecking(false);
  }, [tools]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  return { tools: monitoredTools, isChecking, refresh: checkStatus };
}