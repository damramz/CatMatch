import { useState } from "react";
import SwipeScreen from "@/components/swipe-screen";
import SummaryScreen from "@/components/summary-screen";
import { useCatApiStatic } from "@/hooks/use-cat-api-static";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Cat {
  id: number;
  url: string;
  name: string;
}

export interface LikedCat {
  cat: Cat;
  index: number;
}

export default function CatMatch() {
  const [currentCatIndex, setCurrentCatIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<LikedCat[]>([]);
  const [gamePhase, setGamePhase] = useState<'playing' | 'summary'>('playing');

  const { data: cats, isLoading, error, refetch } = useCatApiStatic(10);

  const handleLike = (cat: Cat) => {
    setLikedCats(prev => [...prev, { cat, index: currentCatIndex }]);
    handleNext();
  };

  const handleDislike = () => {
    handleNext();
  };

  const handleNext = () => {
    if (cats && currentCatIndex + 1 >= cats.length) {
      setGamePhase('summary');
    } else {
      setCurrentCatIndex(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setCurrentCatIndex(0);
    setLikedCats([]);
    setGamePhase('playing');
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h3 className="text-xl font-semibold text-slate-700">Oops! Something went wrong</h3>
          <p className="text-gray-600">We couldn't load the cats. Please check your connection and try again.</p>
          <Button 
            onClick={() => refetch()} 
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'summary') {
    return (
      <SummaryScreen 
        likedCats={likedCats}
        totalCats={cats?.length || 0}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <SwipeScreen
      cats={cats || []}
      currentCatIndex={currentCatIndex}
      isLoading={isLoading}
      onLike={handleLike}
      onDislike={handleDislike}
      onReset={resetGame}
    />
  );
}
