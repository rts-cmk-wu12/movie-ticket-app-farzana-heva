// File: src/pages/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import BackArrow from "../icons/BackArrow";
export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US`
        );
        const data = await res.json();
        if (data.status_code) {
          setError(data.status_message || "Movie not found.");
          setMovie(null);
        } else {
          setMovie(data);
          setError(null);
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
        setMovie(null);
      }
    };
    fetchMovie();
  }, [id]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen  text-white">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen  text-white">
        Loading...
      </div>
    );
  }

  const synopsis = movie.overview || "";
  const maxLength = 180;
  const displayedText = showFullSynopsis
    ? synopsis
    : synopsis.slice(0, maxLength);
  const toggleSynopsis = () => setShowFullSynopsis((prev) => !prev);

  return (
    <div className="pb-6 bg-[#1B1E25] text-white min-h-screen  mx-auto pt-8 pt-2">

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4">
        <Link to="/explore" className="text-gray-400 text-lg font-bold">
          <BackArrow />
        </Link>
        <h1 className="text-xl font-bold">Details Movie</h1>
        <FiBookmark size={22} />
      </div>

      {/* Movie Poster */}

      {/* Scrollable Preview Thumbnails */}
      <div className="overflow-x-auto flex gap-4 px-4 mb-4 py-2 snap-x snap-mandatory scroll-smooth hide-scroll">
        {[...Array(2)].map((_, index) => (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl w-[260px] h-[360px] object-cover ml-0 first:ml-4 last:mr-4"
          />
        ))}
      </div>
      {/* Title, Director, Rating */}

      <div className="px-5 mt-3 ">
        <h2 className="text-[20px] font-semibold mb-1 text-white leading-tight">
          {movie.title}
        </h2>
        <div className="text-[#B2B5BB] text-sm flex items-center gap-2">
          <span>
            Director:{" "}
            <span className="text-[#BABFC9] font-medium">
              Destin Daniel Cretton
            </span>
          </span>
          <span className="text-[#696D74]">|</span>
          <span className="flex items-center gap-2">
            <FaStar size={16} className="text-[#FFA235] ml-2" />
            <span className="ml-1 text-[#BABFC9]">
              {movie.vote_average?.toFixed(1)}
            </span>
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="flex gap-4 flex-wrap gap-2 mt2">
        {movie.genres?.slice(0, 2).map((genre) => (
          <span
            key={genre.id}
            className="bg-[#252932] text-[#B2B5BB] text-sm px-4  h-[29px] flex items-center rounded-lg"
          >
            {genre.name}
          </span>
        ))}
        {movie.runtime && (
          <span className="bg-[#252932] text-[#B2B5BB] text-sm  px-4 h-[29px] flex items-center rounded-lg">
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </span>
        )}
      </div>

      {/* 📖 Synopsis Section */}
      <div className="px-4 mt-4">
        <h3 className="text-lg font-semibold mb-1 text-white">Synopsis</h3>
        <p className="text-sm text-[#696D74] leading-relaxed">
          {displayedText}
          {synopsis.length > maxLength && (
            <>
              {!showFullSynopsis && "... "}
              <button
                onClick={toggleSynopsis}
                className="text-[#54A8E5] font-medium ml-1"
              >
                {showFullSynopsis ? "Read Less" : "Read More"}
              </button>
            </>
          )}
        </p>
      </div>

      {/* Book Ticket Button */}
      <div className="px-4 mt-6">
        <Link
          to={`/select-seats/${movie.id}`}
          className="block text-center bg-[#54a8e5] hover:bg-[#3e91cd] py-3 rounded-xl font-semibold"
        >
          Book Ticket
        </Link>
      </div>
    </div>
  );
}
