import React, { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [location, setLocation] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("فشل تحديد الموقع ❌", error);
      }
    );
  }, []);

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

  useEffect(() => {
    if (!location) return;
    const fetchCinemas = async () => {
      try {
        const res = await fetch(
          `/api/proxy/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=movie_theater&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
        );
        const data = await res.json();
        const rawCinemas = data.results || [];
        const destinations = rawCinemas
          .map((c) => `${c.geometry.location.lat},${c.geometry.location.lng}`)
          .join("|");

        const distanceRes = await fetch(
          `/api/proxy/maps/api/distancematrix/json?origins=${location.lat},${location.lng}&destinations=${destinations}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
        );
        const distanceData = await distanceRes.json();

        const enriched = rawCinemas.map((cinema, idx) => {
          const photoRef = cinema.photos?.[0]?.photo_reference;
          const photoUrl = photoRef
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
            : "https://cdn-icons-png.flaticon.com/512/684/684908.png";

          return {
            ...cinema,
            distanceText: distanceData.rows[0].elements[idx]?.distance?.text || "❓",
            photoUrl,
          };
        });
        setCinemas(enriched);
      } catch (error) {
        console.error("خطأ في جلب السينمات أو المسافات:", error);
      }
    };
    fetchCinemas();
  }, [location]);

  return (
    <div className="bg-[#1B1E25] min-h-screen text-white p-4 space-y-6 mx-auto relative" style={{ maxWidth: "420px" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Welcome Back,</p>
          <p className="text-lg font-bold">Osyyy</p>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full border border-gray-600"
        />
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search your favourite movie"
          className="w-full bg-[#2C2F36] text-sm rounded-xl pl-10 pr-4 py-2 placeholder-gray-400 focus:outline-none"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div>
        <h2 className="text-white font-semibold text-lg mb-2">Coming Soon</h2>
        <div className="overflow-x-auto flex gap-4 pb-2 snap-x snap-mandatory scroll-smooth hide-scroll">
          {movies.slice(0, 10).map((movie) => (
            <div
              key={movie.id}
              className="snap-start w-[85%] flex-shrink-0 rounded-xl overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-48 w-full object-cover"
              />
              <div className="pt-2">
                <p className="text-sm font-semibold truncate">{movie.title}</p>
                <p className="text-xs text-gray-400">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-white font-semibold text-lg">Cinema Near You</h2>
          <button
            className="text-sm text-gray-400 hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "See less" : "See all"}
          </button>
        </div>

        <div className="space-y-2">
          {(showAll ? cinemas : cinemas.slice(0, 2)).map((cinema, idx) => (
            <div
              key={idx}
              className="flex items-center p-3 gap-4 rounded-lg bg-[#1B1E25]"
            >
              <img
                src={cinema.photoUrl}
                alt={cinema.name}
                className="w-12 h-12 object-cover rounded-xl"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{cinema.name}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-blue-400" />
                  {cinema.vicinity}
                </p>
                <p className="text-xs text-blue-400">{cinema.distanceText}</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-yellow-400 flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> {cinema.rating || "N/A"}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    cinema.name + " " + cinema.vicinity
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline"
                >
                  Open map
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
