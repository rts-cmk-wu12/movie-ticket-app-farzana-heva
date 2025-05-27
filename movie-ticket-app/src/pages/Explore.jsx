// src/Explore.jsx

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import MovieCard from "../components/MovieCard";
import BackArrow from "../icons/BackArrow";

const Explore = () => {
  const [nowShowing, setNowShowing] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [tab, setTab] = useState("now");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setNowShowing(data.results));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setUpcoming(data.results));
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) inputRef.current.focus();
  }, [isSearchOpen]);

  const activeSecondRow = tab === "now" ? nowShowing : upcoming;

  return (
    <div
      className="bg-[#1B1E25] min-h-screen text-white p-4 space-y-6 mx-auto overflow-hidden"
      style={{ maxWidth: "375px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/" className="text-gray-400 text-lg font-bold">
          <BackArrow />
        </Link>
        <h1 className="text-lg font-semibold">Explore Movie</h1>
        <button onClick={() => setIsSearchOpen((v) => !v)}>
          <FiSearch size={22} className="text-white" />
        </button>
      </div>

      {/* Search */}
      {isSearchOpen && (
        <div className="relative">
          <input
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your favourite movie"
            className="w-full bg-[#2C2F36] text-sm rounded-xl pl-10 pr-8 py-2 placeholder-gray-400"
          />
          <FiSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={18}
          />
          <button
            onClick={() => {
              setSearchTerm("");
              setIsSearchOpen(false);
            }}
            className="absolute right-2 top-2.5 text-gray-400"
          >
            <IoMdClose size={20} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="w-[340px] flex items-center bg-[#2C2F36] rounded-xl p-[10px] gap-2">
        <button
          onClick={() => setTab("now")}
          className={`w-[145px] text-sm font-medium rounded-lg py-2 transition-all duration-200 ${
            tab === "now" ? "bg-[#54A8E5] text-white shadow-md" : "text-gray-400"
          }`}
        >
          Now Showing
        </button>
        <button
          onClick={() => setTab("upcoming")}
          className={`w-[145px] text-sm font-medium rounded-lg py-2 transition-all duration-200 ${
            tab === "upcoming" ? "bg-[#54A8E5] text-white shadow-md" : "text-gray-400"
          }`}
        >
          Upcoming
        </button>
      </div>

      {/* Top Movies Row */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold">Top Movies</h2>
          <span className="text-sm text-gray-400">See more</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scroll">
          {nowShowing.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                localStorage.setItem("lastMovieId", movie.id);
                navigate(`/movie/${movie.id}`);
              }}
              className="min-w-[140px]"
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average / 2}
                size="large"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Poster Only Second Row */}
      <div>
        <div className="flex justify-between items-center mb-2 mt-6">
          <h2 className="text-base font-semibold">
            {tab === "now" ? "Now Showing" : "Recommended"}
          </h2>
          <span className="text-sm text-gray-400">See more</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scroll">
          {activeSecondRow.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                localStorage.setItem("lastMovieId", movie.id);
                navigate(`/movie/${movie.id}`);
              }}
              className="w-[120px] h-[117px] flex-shrink-0 rounded-xl overflow-hidden bg-gray-800"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
