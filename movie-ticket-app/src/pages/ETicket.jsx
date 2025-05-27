import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ETicketMini from "../components/ETicketMini";
import DownloadTicketModal from "../components/DownloadTicketModal";
import { useState } from "react";
 
export default function ETicket() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
 
  return (
    <div className="relative min-h-screen">
      {/* Background overlay when modal is open */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" />
      )}
 
      <div
        className={`bg-[#1B1E25] min-h-screen text-white p-4 space-y-6 mx-auto relative z-10 transition-all ${
          isModalOpen ? "opacity-40" : "opacity-100"
        }`}
        style={{ maxWidth: "420px" }}
      >
        {/* Header */}
        <div className="flex items-center p-6">
          <button
            onClick={() => navigate(-1)}
            className="text-white p-2 rounded-full hover:bg-gray-700"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold flex-1 text-center -ml-6">
            E-Ticket
          </h1>
        </div>
 
        {/* Content */}
        <div className="px-6">
          {/* Instruction */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Instruction</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Come to the cinema, show and scan the barcode to the space
              provided. Continue to comply with health protocols.
            </p>
          </div>
 
          {/* E-Ticket Mini Component */}
          <div className="flex justify-center">
            <ETicketMini />
          </div>
 
          {/* Download Button */}
          <button
            type="submit"
            className="block w-full bg-[#54A8E5] text-white py-4 rounded-xl text-center font-bold text-base shadow-sm mt-6"
            onClick={() => setIsModalOpen(true)}
          >
            Download E-Ticket
          </button>
        </div>
      </div>
      {/* Modal */}
      <DownloadTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
 
 