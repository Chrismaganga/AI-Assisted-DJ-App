"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  Music,
  RotateCcw,
  RotateCw,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DJDeck({
  deckNumber,
  currentTrack,
  isPlaying,
  onPlayPause,
  onNextTrack,
  volume,
  onVolumeChange,
  bpm,
  key,
  mood,
}) {
  const [pitch, setPitch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePitchChange = (newPitch) => {
    setPitch(newPitch);
    // Calculate new BPM based on pitch
    const newBpm = Math.round(bpm * (1 + newPitch / 100));
    toast.success(
      `Pitch: ${newPitch > 0 ? "+" : ""}${newPitch}% (BPM: ${newBpm})`
    );
  };

  const handleLoadTrack = () => {
    setIsLoading(true);
    // Simulate loading track
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Track loaded successfully!");
    }, 2000);
  };

  return (
    <motion.div
      className="dj-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gradient">Deck {deckNumber}</h3>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isPlaying ? "bg-neon-green animate-pulse" : "bg-dark-400"
            }`}
          ></div>
          <span className="text-sm text-dark-300">
            {isPlaying ? "Playing" : "Stopped"}
          </span>
        </div>
      </div>

      {/* Vinyl Record Display */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div
            className={`vinyl-record ${isPlaying ? "animate-spin-slow" : ""}`}
          ></div>
          {currentTrack && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs font-bold text-white">
                  {currentTrack.title}
                </p>
                <p className="text-xs text-dark-300">{currentTrack.artist}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Track Info */}
      <div className="mb-6 p-4 bg-dark-700/50 rounded-lg">
        {currentTrack ? (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">{currentTrack.title}</h4>
            <p className="text-xs text-dark-300">{currentTrack.artist}</p>
            <div className="flex items-center justify-between text-xs">
              <span>BPM: {bpm}</span>
              <span>Key: {key}</span>
              <span className="capitalize">{mood}</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <Music className="w-8 h-8 mx-auto mb-2 text-dark-400" />
            <p className="text-sm text-dark-300">No track loaded</p>
            <button
              onClick={handleLoadTrack}
              disabled={isLoading}
              className="mt-2 dj-button text-sm py-2 px-4"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Load Track"
              )}
            </button>
          </div>
        )}
      </div>

      {/* Waveform Visualization */}
      <div className="mb-6">
        <div className="flex items-end justify-center h-16 space-x-1">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="waveform-bar"
              style={{
                width: "3px",
                height: `${isPlaying ? Math.random() * 60 + 10 : 10}px`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Playback Controls */}
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => onPlayPause()}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple 
                     flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={() => onNextTrack()}
            className="w-10 h-10 rounded-full bg-dark-700 border border-neon-blue 
                     flex items-center justify-center hover:bg-neon-blue/20 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Pitch Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Pitch: {pitch > 0 ? "+" : ""}
            {pitch}%
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            value={pitch}
            onChange={(e) => handlePitchChange(parseInt(e.target.value))}
            className="eq-slider"
          />
          <div className="flex justify-between text-xs text-dark-300">
            <span>-50%</span>
            <span>0%</span>
            <span>+50%</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Volume</label>
            <Volume2 className="w-4 h-4 text-dark-300" />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => onVolumeChange(parseInt(e.target.value) / 100)}
            className="eq-slider"
          />
          <div className="flex justify-between text-xs text-dark-300">
            <span>0%</span>
            <span>{Math.round(volume * 100)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Cue Points */}
        <div className="flex justify-center space-x-2">
          <button
            className="w-8 h-8 rounded-full bg-dark-700 border border-neon-blue 
                           flex items-center justify-center hover:bg-neon-blue/20 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 rounded-full bg-dark-700 border border-neon-blue 
                           flex items-center justify-center hover:bg-neon-blue/20 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
