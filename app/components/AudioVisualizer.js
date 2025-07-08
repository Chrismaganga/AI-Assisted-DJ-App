"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AudioVisualizer({ isPlaying }) {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    // Generate random frequency data for visualization
    const generateBars = () => {
      const newBars = Array.from({ length: 32 }, () => ({
        height: Math.random() * 100,
        color: getRandomColor(),
      }));
      setBars(newBars);
    };

    if (isPlaying) {
      generateBars();
      const interval = setInterval(generateBars, 100);
      return () => clearInterval(interval);
    } else {
      // Reset bars when not playing
      setBars(
        Array.from({ length: 32 }, () => ({ height: 5, color: "#475569" }))
      );
    }
  }, [isPlaying]);

  const getRandomColor = () => {
    const colors = ["#00ffff", "#ff0080", "#8000ff", "#00ff00", "#ffff00"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="w-full">
      {/* Main Frequency Bars */}
      <div className="flex items-end justify-center space-x-1 h-32 mb-4">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className="rounded-t-sm min-w-[4px]"
            style={{
              height: `${bar.height}%`,
              backgroundColor: bar.color,
              boxShadow: `0 0 10px ${bar.color}40`,
            }}
            animate={{
              height: isPlaying ? `${bar.height}%` : "5%",
              backgroundColor: isPlaying ? bar.color : "#475569",
            }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Circular Waveform */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              opacity="0.3"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray="251.2"
              strokeDashoffset={isPlaying ? "0" : "251.2"}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#ff0080" />
                <stop offset="100%" stopColor="#8000ff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Pulse */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={
              isPlaying
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <div className="w-4 h-4 bg-neon-blue rounded-full glow"></div>
          </motion.div>
        </div>
      </div>

      {/* Beat Grid */}
      <div className="mt-6">
        <div className="flex justify-center space-x-1">
          {Array.from({ length: 16 }, (_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-dark-600"
              animate={
                isPlaying
                  ? {
                      backgroundColor: i % 4 === 0 ? "#00ffff" : "#ff0080",
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }
                  : {}
              }
              transition={{
                duration: 0.5,
                repeat: isPlaying ? Infinity : 0,
                delay: i * 0.125,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Spectrum Analyzer */}
      <div className="mt-6">
        <div className="flex items-end justify-center space-x-0.5 h-16">
          {Array.from({ length: 64 }, (_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-neon-blue to-neon-pink rounded-t-sm"
              style={{
                height: isPlaying ? `${Math.random() * 60 + 10}%` : "10%",
              }}
              animate={{
                height: isPlaying ? `${Math.random() * 60 + 10}%` : "10%",
              }}
              transition={{
                duration: 0.1,
                delay: i * 0.01,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Audio Level Meters */}
      <div className="mt-6 flex justify-center space-x-8">
        <div className="text-center">
          <div className="w-4 h-20 bg-dark-700 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute bottom-0 w-full bg-gradient-to-t from-neon-green to-neon-blue"
              animate={{
                height: isPlaying ? `${Math.random() * 80 + 20}%` : "20%",
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="text-xs text-dark-300 mt-2">L</p>
        </div>

        <div className="text-center">
          <div className="w-4 h-20 bg-dark-700 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute bottom-0 w-full bg-gradient-to-t from-neon-green to-neon-blue"
              animate={{
                height: isPlaying ? `${Math.random() * 80 + 20}%` : "20%",
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="text-xs text-dark-300 mt-2">R</p>
        </div>
      </div>
    </div>
  );
}
