"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollIndicator = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPosition = () => {
    window.scrollTo({
      top: showScrollUp ? 0 : window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={scrollToPosition}
        className="fixed bottom-8 right-8 bg-yellow-500 text-black p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors z-50"
        aria-label={showScrollUp ? "Scroll to top" : "Scroll down"}
      >
        {showScrollUp ? (
          <ChevronUp className="h-6 w-6" />
        ) : (
          <ChevronDown className="h-6 w-6" />
        )}
      </motion.button>
    </AnimatePresence>
  );
};
