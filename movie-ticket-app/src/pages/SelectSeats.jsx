//src/pages/SelectSeats.



import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import BackArrow from "../icons/BackArrow";
import dayjs from "dayjs";

export default function SelectSeats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState("13:00");
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState("");

  const selectSoundRef = useRef(new Audio("/sounds/select.mp3"));
  const deselectSoundRef = useRef(new Audio("/sounds/deselect.mp3"));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      try {
        const res = await fetch(
          `/api/proxy/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=movie_theater&key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }`
        );
        const data = await res.json();
        const cinemasList = data.results.map((c) => ({
          id: c.place_id,
          name: c.name,
        }));
        setCinemas(cinemasList);
        if (cinemasList.length > 0) setSelectedCinema(cinemasList[0].name);
      } catch (error) {
        console.error("خطأ في جلب السينمات:", error);
      }
    });
  }, []);

  const toggleSeatSelection = (row, seat) => {
    const seatId = `${row}-${seat}`;
    setSelectedSeats((prevSeats) => {
      const newSeats = new Set(prevSeats);
      if (newSeats.has(seatId)) {
        newSeats.delete(seatId);
        deselectSoundRef.current.play();
      } else {
        newSeats.add(seatId);
        selectSoundRef.current.play();
      }
      return newSeats;
    });
  };

  const renderSeat = (row, seat, reserved = false) => {
    const seatId = `${row}-${seat}`;
    const isSelected = selectedSeats.has(seatId);
    return (
      <div
        key={seatId}
        className={`w-[30px] h-[30px] rounded-lg cursor-pointer border mx-[5px] transition-all duration-200 ${
          reserved
            ? "bg-[#eb5757] border-none"
            : isSelected
            ? "bg-[#2196f3] border-none scale-110"
            : "bg-[#1b1e25] border-[#5c5f66]"
        }`}
        onClick={() => !reserved && toggleSeatSelection(row, seat)}
      ></div>
    );
  };

  const handleCheckout = () => {
    if (selectedSeats.size === 0) {
      alert("Please select at least one seat.");
      return;
    }

    localStorage.setItem("selectedMovieId", id);
    localStorage.setItem("selectedDate", selectedDate);
    localStorage.setItem("selectedTime", selectedTime);
    localStorage.setItem("eticket_location", selectedCinema);

    localStorage.setItem(
      "eticket_date",
      dayjs(selectedDate).format("DD/MM/YYYY")
    );
    localStorage.setItem(
      "eticket_time",
      dayjs(`${selectedDate}T${selectedTime}`).format("hh.mm A")
    );
    localStorage.setItem("eticket_seats", Array.from(selectedSeats).join(", "));

    navigate("/checkout");
  };

  return (
    <div className="pt-2 bg-[#1B1E25] text-white min-h-screen max-w-[340px] mx-auto px-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-10 mb-2">
        <Link to="/explore" className="text-gray-400 text-lg">
          <BackArrow />
        </Link>
        <h1 className="text-xl font-bold">Select Seats</h1>
        <div className="w-5" />
      </div>
      {/* Cinema Dropdown */}
      <div className="mb-6">
        <h2 className="pt-6 text-sm mb-2 text-white">Cinema</h2>
        <div className="relative">
          <select
            value={selectedCinema}
            onChange={(e) => setSelectedCinema(e.target.value)}
            className="w-full bg-[#1B1E25] border border-[#696D74] text-sm text-[#BABFC9] rounded-xl p-4 focus:outline-none"
            style={{
              appearance: "none", // Chrome & modern
              WebkitAppearance: "none", // Safari
              MozAppearance: "none", // Firefox
              backgroundImage: "none", // remove default arrow
            }}
          >
            {cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.name}>
                {cinema.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date & Time */}
      <div className="pt-1 grid grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-sm mb-2 text-white">Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-[#1B1E25] text-[#BABFC9] border border-[#696D74] rounded-xl p-4 text-sm focus:outline-none"
          />
        </div>
        <div>
          <h2 className="text-sm mb-2 text-white">Time</h2>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full bg-[#1B1E25] text-[#BABFC9] border border-[#696D74] rounded-xl p-4 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Screen */}
      <div className="flex justify-center">
        <img src="/Screen.png" alt="screen" className="w-[260px] h-auto pt-6" />
      </div>

      {/* Seats */}
      <div className="mb-4">
        {[...Array(6)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center space-x-3 mb-2 pt-[1px]"
          >
            {[...Array(rowIndex === 0 || rowIndex === 5 ? 3 : 4)].map(
              (_, seatIndex) =>
                renderSeat(
                  rowIndex,
                  seatIndex,
                  rowIndex === 3 || rowIndex === 4
                )
            )}
            <div className="w-[20px]"></div>
            {[...Array(rowIndex === 0 || rowIndex === 5 ? 3 : 4)].map(
              (_, seatIndex) =>
                renderSeat(
                  rowIndex,
                  seatIndex + (rowIndex === 0 || rowIndex === 5 ? 4 : 5),
                  rowIndex === 3 || rowIndex === 4
                )
            )}
          </div>
        ))}
      </div>

      {/* Legends */}
      <div className="pb-2 pt-4">
        <div className="flex justify-around mb-4">
          <div className="flex items-center gap-3">
            <div className="w-[10px] h-[10px] bg-[#54A8E5] rounded-full"></div>
            <span className="text-sm text-[#B2B5BB]">Selected</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[10px] h-[10px] bg-[#EB5757] rounded-full"></div>
            <span className="text-sm text-[#B2B5BB]">Reserved</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[10px] h-[10px] border border-[#5C5F66] bg-transparent rounded-full"></div>
            <span className="text-sm text-[#B2B5BB]">Available</span>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleCheckout}
            className="w-[315px] h-[57px] bg-[#54A8E5] hover:bg-[#3e91cd] text-white rounded-[12px] text-[16px] font-bold"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
