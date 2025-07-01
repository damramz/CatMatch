import { useState, useEffect } from "react";
import { Heart, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import CatCard from "./cat-card";
import type { Cat } from "@/pages/cat-match";

interface SwipeScreenProps {
  cats: Cat[];
  currentCatIndex: number;
  isLoading: boolean;
  onLike: (cat: Cat) => void;
  onDislike: () => void;
  onReset: () => void;
}

export default function SwipeScreen({
  cats,
  currentCatIndex,
  isLoading,
  onLike,
  onDislike,
  onReset,
}: SwipeScreenProps) {
  const [floatingHearts, setFloatingHearts] = useState<
    Array<{ id: string; x: number; y: number; size: number }>
  >([]);

  const currentCat = cats[currentCatIndex];
  const progress =
    cats.length > 0 ? ((currentCatIndex + 1) / cats.length) * 100 : 0;

  const createFloatingHearts = () => {
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight / 2,
      size: Math.random() * 10 + 15,
    }));

    setFloatingHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setFloatingHearts((prev) =>
        prev.filter(
          (heart) => !newHearts.find((newHeart) => newHeart.id === heart.id)
        )
      );
    }, 2000);
  };

  const handleLike = () => {
    if (currentCat) {
      createFloatingHearts();
      onLike(currentCat);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-teal-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🐱</div>
              <h1 className="text-xl font-bold text-slate-700">CatMatch</h1>
            </div>
          </div>
        </header>

        <main className="max-w-md mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mb-4"></div>
            <p className="text-gray-600">Loading adorable cats...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-teal-50">
      {/* Floating Hearts */}
      <div className="floating-hearts">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="heart absolute"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              fontSize: `${heart.size}px`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🐱</div>
              <h1 className="text-xl font-bold text-slate-700">CatMatch</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-medium">
                {currentCatIndex + 1} of {cats.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div
              className="progress-bar bg-gradient-to-r from-red-400 to-teal-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Instructions */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-700 mb-2">
            Find Your Purrfect Match
          </h2>
          <p className="text-gray-600">Swipe right to like, left to pass</p>
        </div>

        {/* Card Stack */}
        <div className="card-stack relative h-96 flex items-center justify-center mb-8">
          {currentCat && (
            <CatCard
              key={currentCat.id}
              cat={currentCat}
              onLike={handleLike}
              onDislike={onDislike}
              isTopCard={true}
            />
          )}

          {/* Preview next card */}
          {cats[currentCatIndex + 1] && (
            <div
              className="absolute inset-0 bg-white rounded-2xl shadow-lg overflow-hidden z-10"
              style={{
                transform: "scale(0.95) translateY(10px)",
                opacity: 0.7,
              }}
            >
              <img
                src={cats[currentCatIndex + 1].url}
                alt="Next cat"
                className="w-full h-4/5 object-cover"
              />
              <div className="p-4 h-1/5 flex items-center justify-center">
                <h3 className="font-semibold text-slate-700">Next Cat</h3>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8">
          <Button
            onClick={onDislike}
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-gray-200 hover:bg-gray-50 p-0"
          >
            <X className="w-6 h-6 text-red-400" />
          </Button>
          <Button
            onClick={handleLike}
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-gray-200 hover:bg-gray-50 p-0"
          >
            <Heart className="w-6 h-6 text-red-400" />
          </Button>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="text-center mt-4 text-sm text-gray-500 md:hidden">
          <span className="mr-1">✋</span>
          Swipe or tap buttons above
        </div>
      </main>
    </div>
  );
}
