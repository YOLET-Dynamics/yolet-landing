"use client";

import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollIndicator = (): ReactElement => {
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        onClick={scrollToPosition}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-[1rem] border border-white/10 bg-black/[0.72] px-4 py-3 text-sm text-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-colors hover:text-white"
        aria-label={showScrollUp ? "Scroll to top" : "Scroll down"}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        <span>{showScrollUp ? "Back to top" : "Explore"}</span>
        {showScrollUp ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </motion.button>
    </AnimatePresence>
  );
};
