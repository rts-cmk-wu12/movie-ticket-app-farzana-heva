import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
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
 
  const toggleSeatSelection = (row, seat) => {
    const seatId = `${row}-${seat}`;
    setSelectedSeats((prevSeats) => {
      const newSeats = new Set(prevSeats);
      if (newSeats.has(seatId)) {
        newSeats.delete(seatId);
      } else {
        newSeats.add(seatId);
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
        className={`w-[30px] h-[30px] rounded-lg cursor-pointer border mx-[4px] ${
          reserved
            ? "bg-[#eb5757] border-none"
            : isSelected
            ? "bg-[#2196f3] border-none"
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
 
    // Format and store for E-Ticket page
    localStorage.setItem(
      "eticket_date",
      dayjs(selectedDate).format("DD/MM/YYYY")
    );
    localStorage.setItem(
      "eticket_time",
      dayjs(`${selectedDate}T${selectedTime}`).format("hh.mm A")
    );
    localStorage.setItem("eticket_location", "Viva Cinema");
 
    // Save selected seats as a comma-separated string
    localStorage.setItem("eticket_seats", Array.from(selectedSeats).join(", "));
 
    navigate("/checkout");
  };
 
  return (
    <div className="pt-[30px] bg-[#1B1E25] text-white min-h-screen max-w-sm mx-auto w-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-10 mb-6">
        <Link to="/explore" className="text-gray-400 text-lg">
          <BackArrow />
        </Link>
        <h1 className="text-xl font-bold">Select Seats</h1>
        <div className="w-5" />
      </div>
 
      <div className="px-6">
        {/* Cinema Name */}
        <div className="mb-6">
          <h2 className="pt-[20px] text-sm mb-2 text-white">Cinema</h2>
          <div className="flex justify-between items-center bg-[#1B1E25] rounded-xl border border-[#696D74] p-4">
            <span className="text-sm text-[#BABFC9]">Viva Cinema</span>
            <ChevronDown size={20} className="text-[#696D74]" />
          </div>
        </div>
 
        {/* Date and Time */}
        <div className="pt-[20px] grid grid-cols-2 gap-4 mb-6">
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
        <div className="flex justify-center mb-4">
          <img
            src="/Screen.png"
            alt="screen"
            className="w-[260px] h-auto pt-[40px]"
          />
        </div>
 
        {/* Seats */}
        <div className="mb-6">
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
              <div className="w-10"></div>
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
        <div className="flex justify-around mb-6 pt-[20px]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#2196f3]"></div>
            <span className="text-sm text-white">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#eb5757]"></div>
            <span className="text-sm text-white">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-[#5c5f66] bg-[#1b1e25]"></div>
            <span className="text-sm text-white">Available</span>
          </div>
        </div>
 
        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="block w-full bg-[#54a8e5] hover:bg-[#3e91cd] text-white py-4 rounded-xl text-center font-bold"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
 
 