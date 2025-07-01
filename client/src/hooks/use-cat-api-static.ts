import { useQuery } from "@tanstack/react-query";
import type { Cat } from "@/pages/cat-match";

export function useCatApiStatic(count: number = 10) {
  return useQuery<Cat[]>({
    queryKey: ["/api/cats", count],
    queryFn: async () => {
      const cats: Cat[] = [];
      
      // Generate unique cat images from CATAAS
      for (let i = 0; i < count; i++) {
        const randomParam = Math.random().toString(36).substring(7);
        cats.push({
          id: i,
          url: `https://cataas.com/cat?${randomParam}&width=400&height=500`,
          name: `Cat ${i + 1}`
        });
      }
      
      return cats;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}