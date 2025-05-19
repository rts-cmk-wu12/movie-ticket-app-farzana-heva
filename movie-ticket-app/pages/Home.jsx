import React, { useEffect, useState } from "react";
import.meta.env.VITE_TMDB_API_KEY
// import.meta.env.VITE_TMDB_API_KEY
export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchComingSoon = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovies(data.results);
    };

    fetchComingSoon();
  }, []);

  return (
    <div className="text-white bg-black min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">🎬 Coming Soon</h1>
      <div className="grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-2">
              <h2 className="text-sm font-semibold">{movie.title}</h2>
              <p className="text-xs text-gray-400">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
