import React from "react";
import { Star as StarIcon } from "lucide-react";

interface RatingProps {
  rating: number; // decimal rating (e.g., 4.3)
  maxRating?: number; // maximum number of stars (default is 5)
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      let fill: string;
      if (rating >= i) {
        fill = "currentColor"; // Full star
      } else if (rating > i - 1) {
        fill = "rgba(255, 215, 0, 0.5)"; // Partial star
      } else {
        fill = "none"; // Empty star
      }
      stars.push(
        <StarIcon
          key={i}
          fill={fill}
          stroke="currentColor"
          style={{ cursor: "pointer", margin: "0 2px", color: "gold" }}
        />
      );
    }
    return stars;
  };

  return <div className="flex items-center">{renderStars()}</div>;
};

export default Rating;
