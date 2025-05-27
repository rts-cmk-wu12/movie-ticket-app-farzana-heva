import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TicketDownload from "../assets/Paper-Download.svg"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
 
const DownloadTicketModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
 
  const handleETicket = () => {
    onClose();
    navigate("/");
  };
 
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={onClose}
          />
 
          {/* Bottom Half Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 bottom-0 w-full h-1/2 z-50 flex justify-center"
          >
            <div
              className="h-full flex flex-col items-center justify-center text-center px-6 py-8 relative shadow-lg w-full"
              style={{
                backgroundColor: "#54a8e5",
                maxWidth: 375,
                borderTopLeftRadius: "60px",
                borderTopRightRadius: "60px",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              {/* Outer Blue Circle with White Inner Circle and Tick */}
              <div className="absolute bg-[#54a8e5] top-[-2.5em] left-1/2 -translate-x-1/2 position-relative border-2 border-white rounded-full w-[112px] h-[112px] flex items-center justify-center">
                <div className="p-1 rounded-full ">
                  <div className="p-3 rounded-full">
                    <img src={TicketDownload} alt="Ticket Download" />
                  </div>
                </div>
              </div>
 
              {/* Modal Content */}
              <h2 className="text-white font-semibold text-lg mt-10">
                Your ticket has been
                <br />
                downloaded
              </h2>
              <p className="text-white text-sm mt-3 max-w-[280px]">
                Adele is a Scottish heiress whose extremely wealthy family owns
                estates and grounds. When she was a teenager. Read More{" "}
                <span className="underline">Read More</span>
              </p>
 
              <button
                onClick={handleETicket}
                className="mt-6 !bg-black text-white py-2 px-6 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  padding: "0.5rem 6rem",
                }}
              >
                Back To Home
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
 
export default DownloadTicketModal;
 
 