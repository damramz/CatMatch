import { useQuery } from "@tanstack/react-query";
import type { Cat } from "@/pages/cat-match";

export function useCatApi(count: number = 10) {
  return useQuery<Cat[]>({
    queryKey: ["/api/cats", count],
    queryFn: async () => {
      const response = await fetch(`/api/cats/${count}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cats');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
