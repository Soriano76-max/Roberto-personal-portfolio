"use client";

import { useState, useEffect } from "react";
import { IconButton, Zoom } from "@mui/material";
import { IoArrowUp } from "react-icons/io5";

interface ScrollToTopProps {
  darkMode: boolean;
}

export default function ScrollToTop({ darkMode }: ScrollToTopProps) {
  // State to track if button should be visible
  const [isVisible, setIsVisible] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={isVisible}>
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 40,
          right: 40,
          zIndex: 1000,
          backgroundColor: darkMode ? "#3a86ff" : "#3a86ff",
          color: "#ffffff",
          width: 56,
          height: 56,
          boxShadow: "0 4px 20px rgba(58, 134, 255, 0.4)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: darkMode ? "#5e60ce" : "#5e60ce",
            boxShadow: "0 6px 28px rgba(58, 134, 255, 0.6)",
            transform: "translateY(-4px)",
          },
          // Adjust position for mobile devices
          "@media (max-width: 600px)": {
            bottom: 20,
            right: 20,
            width: 48,
            height: 48,
          },
        }}
        aria-label="scroll to top"
      >
        <IoArrowUp size={24} />
      </IconButton>
    </Zoom>
  );
}
