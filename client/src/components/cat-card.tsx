import { useState, useRef, useCallback, useEffect } from "react";
import { useGesture } from "@/hooks/use-gesture";
import type { Cat } from "@/pages/cat-match";

interface CatCardProps {
  cat: Cat;
  onLike: () => void;
  onDislike: () => void;
  isTopCard: boolean;
}

export default function CatCard({
  cat,
  onLike,
  onDislike,
  isTopCard,
}: CatCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0, rotation: 0 });
  const [showLikeIndicator, setShowLikeIndicator] = useState(false);
  const [showDislikeIndicator, setShowDislikeIndicator] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset card state when cat changes
  useEffect(() => {
    setTransform({ x: 0, y: 0, rotation: 0 });
    setShowLikeIndicator(false);
    setShowDislikeIndicator(false);
    setIsDragging(false);
  }, [cat.id]);

  const handleMove = useCallback((deltaX: number, deltaY: number) => {
    const rotation = deltaX * 0.1;
    setTransform({ x: deltaX, y: deltaY, rotation });

    // Show indicators based on swipe direction
    if (deltaX > 30) {
      setShowLikeIndicator(true);
      setShowDislikeIndicator(false);
    } else if (deltaX < -30) {
      setShowDislikeIndicator(true);
      setShowLikeIndicator(false);
    } else {
      setShowLikeIndicator(false);
      setShowDislikeIndicator(false);
    }
  }, []);

  const handleEnd = useCallback(
    (deltaX: number) => {
      setIsDragging(false);

      if (Math.abs(deltaX) > 60) {
        // Swipe threshold met - lowered from 80 to 60 for better mobile experience
        if (deltaX > 0) {
          // Animate card out to the right
          setTransform({ x: window.innerWidth, y: 0, rotation: 30 });
          setTimeout(onLike, 300);
        } else {
          // Animate card out to the left
          setTransform({ x: -window.innerWidth, y: 0, rotation: -30 });
          setTimeout(onDislike, 300);
        }
      } else {
        // Snap back to center
        setTransform({ x: 0, y: 0, rotation: 0 });
        setShowLikeIndicator(false);
        setShowDislikeIndicator(false);
      }
    },
    [onLike, onDislike]
  );

  const handleStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  useGesture(cardRef, {
    onStart: handleStart,
    onMove: handleMove,
    onEnd: handleEnd,
  });

  return (
    <div
      ref={cardRef}
      className={`absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing ${
        isTopCard ? "z-20" : "z-10"
      } ${
        isDragging
          ? "transition-none"
          : "transition-transform duration-300 ease-out"
      }`}
      style={{
        transform: `translateX(${transform.x}px) translateY(${transform.y}px) rotate(${transform.rotation}deg)`,
      }}
    >
      <div className="relative h-full">
        <img
          key={cat.id}
          src={cat.url}
          alt={cat.name}
          className="w-full h-4/5 object-cover"
          loading="lazy"
        />

        <div className="p-4 h-1/5 flex items-center justify-center bg-gradient-to-t from-white to-transparent">
          <div className="text-center">
            <h3 className="font-semibold text-slate-700 text-lg">{cat.name}</h3>
            <p className="text-gray-600 text-sm">Ready for love!</p>
          </div>
        </div>

        {/* Like Indicator */}
        <div className={`like-indicator ${showLikeIndicator ? "show" : ""}`}>
          <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg font-bold text-lg flex items-center">
            ❤️ <span className="ml-2">LIKE</span>
          </div>
        </div>

        {/* Dislike Indicator */}
        <div className={`like-indicator ${showDislikeIndicator ? "show" : ""}`}>
          <div className="bg-red-400/90 text-white px-4 py-2 rounded-lg font-bold text-lg flex items-center">
            ✖️ <span className="ml-2">PASS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
