import { Trophy, Play, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LikedCat } from "@/pages/cat-match";

interface SummaryScreenProps {
  likedCats: LikedCat[];
  totalCats: number;
  onPlayAgain: () => void;
}

export default function SummaryScreen({ likedCats, totalCats, onPlayAgain }: SummaryScreenProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CatMatch Results',
        text: `I liked ${likedCats.length} out of ${totalCats} cats on CatMatch! Find your purrfect match too!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I liked ${likedCats.length} out of ${totalCats} cats on CatMatch! Find your purrfect match too!`;
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🐱</div>
            <h1 className="text-xl font-bold text-slate-700">CatMatch</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Results Header */}
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Your Matches!</h2>
          <p className="text-gray-600 text-lg">
            You liked {likedCats.length} out of {totalCats} cats!
          </p>
        </div>

        {/* Liked Cats Grid */}
        <div className="space-y-4">
          {likedCats.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {likedCats.map((likedCat, index) => (
                <div 
                  key={`${likedCat.cat.id}-${index}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform"
                >
                  <img 
                    src={likedCat.cat.url} 
                    alt={likedCat.cat.name}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  <div className="p-2">
                    <p className="text-sm font-medium text-slate-700 text-center">
                      {likedCat.cat.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🙀</div>
              <p>No matches this time!</p>
              <p className="text-sm">Maybe try again?</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <Button 
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-red-400 to-teal-400 hover:from-red-500 hover:to-teal-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Play className="w-4 h-4 mr-2" />
            Find More Cats
          </Button>
          
          <Button 
            onClick={handleShare}
            variant="outline"
            className="w-full border-2 border-gray-200 hover:bg-gray-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all"
          >
            <Share className="w-4 h-4 mr-2" />
            Share Your Matches
          </Button>
        </div>
      </main>
    </div>
  );
}
