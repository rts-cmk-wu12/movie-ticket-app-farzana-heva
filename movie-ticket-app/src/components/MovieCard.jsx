import React from "react";
import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
 
export default function MovieCard({
  id,
  title,
  poster,
  rating,
  size = "medium",
}) {
  const sizeClasses = {
    small: "w-24 h-36",
    medium: "w-[190px] h-[306px]",
    large: "w-full h-80",
  };
 
  // Calculate stars
  const stars = [];
  if (rating) {
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} size={14} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt key={i} size={14} className="text-yellow-400" />
        );
      } else {
        stars.push(<FiStar key={i} size={14} className="text-gray-500" />);
      }
    }
  }
 
  return (
    <div className="flex flex-col items-start">
      <Link to={`/movie/${id}`}>
        <div
          className={`relative overflow-hidden rounded-xl mb-2 ${sizeClasses[size]}`}
        >
          <img
            src={poster || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </Link>
      <h3 className="font-bold text-sm leading-tight text-white mb-1 truncate w-full">
        {title}
      </h3>
      {rating && (
        <div className="mt-[5px] flex items-center gap-2">{stars}</div>
      )}
    </div>
  );
}
 