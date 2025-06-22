import { Star, StarHalf } from "lucide-react";

type props = {
  rating: number;
  maxRating?: number;
};

const StarRating = ({ rating, maxRating = 5 }: props) => {
  const getStarType = (i: number) => {
    if (i <= rating)
      return (
        <Star
          className="border-none size-4 sm:size-5 text-[#ED9C00]"
          fill="rgb(237 156 0)"
          key={i}
          size={20}
        />
      );
    if (i - 0.5 <= rating)
      return (
        <StarHalf
          size={20}
          className="text-[#ED9C00] size-4 sm:size-5"
          fill="rgb(237 156 0)"
          key={i}
        />
      );
    return <Star className="text-gray-700 size-4 sm:size-5" size={20} key={i} />;
  };

  return (
    <div className="flex">
      {Array.from({ length: maxRating }, (_, i) => getStarType(i + 1))}
    </div>
  );
};

export default StarRating;
