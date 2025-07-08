"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  Music,
  Brain,
  TrendingUp,
  Settings,
  Search,
  Heart,
  Shuffle,
  Repeat,
} from "lucide-react";
import toast from "react-hot-toast";
import DJDeck from "./components/DJDeck";
import AIRecommendations from "./components/AIRecommendations";
import PlaylistManager from "./components/PlaylistManager";
import AudioVisualizer from "./components/AudioVisualizer";
import SpotifyAuth from "./components/SpotifyAuth";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [bpm, setBpm] = useState(128);
  const [key, setKey] = useState("C");
  const [mood, setMood] = useState("energetic");

  useEffect(() => {
    // Check if user is authenticated with Spotify
    const token = localStorage.getItem("spotify_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? "Paused" : "Playing");
  };

  const handleNextTrack = () => {
    // AI will suggest next track based on current BPM, key, and mood
    toast.success("AI suggesting next track...");
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SpotifyAuth onAuth={setIsAuthenticated} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="vinyl-record relative"></div>
          <div>
            <h1 className="text-4xl font-bold text-gradient">AI-Assisted DJ</h1>
            <p className="text-dark-300">
              Powered by AI • Spotify • Beatmatching
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-dark-800/50 rounded-lg px-4 py-2">
            <Brain className="w-5 h-5 text-neon-blue" />
            <span className="text-sm">AI Active</span>
          </div>
          <button className="dj-button">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      {/* Main DJ Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Deck */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <DJDeck
            deckNumber={1}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNextTrack={handleNextTrack}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            bpm={bpm}
            key={key}
            mood={mood}
          />
        </motion.div>

        {/* Center Controls */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="dj-card">
            <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
              AI Mixing Console
            </h2>

            {/* Audio Visualizer */}
            <AudioVisualizer isPlaying={isPlaying} />

            {/* Main Controls */}
            <div className="flex justify-center items-center space-x-6 mt-8">
              <button
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple 
                         flex items-center justify-center hover:scale-110 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="w-12 h-12 rounded-full bg-dark-700 border border-neon-blue 
                         flex items-center justify-center hover:bg-neon-blue/20 transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Track Info */}
            <div className="mt-8 p-4 bg-dark-700/50 rounded-lg">
              <h3 className="font-semibold mb-2">Current Track</h3>
              {currentTrack ? (
                <div className="space-y-2">
                  <p className="text-sm">{currentTrack.title}</p>
                  <p className="text-xs text-dark-300">{currentTrack.artist}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <span>BPM: {bpm}</span>
                    <span>Key: {key}</span>
                    <span>Mood: {mood}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-dark-300">No track loaded</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Deck */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <DJDeck
            deckNumber={2}
            currentTrack={null}
            isPlaying={false}
            onPlayPause={() => {}}
            onNextTrack={() => {}}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            bpm={bpm}
            key={key}
            mood={mood}
          />
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <AIRecommendations
          currentBpm={bpm}
          currentKey={key}
          currentMood={mood}
          onTrackSelect={(track) => {
            setCurrentTrack(track);
            toast.success(`Loaded: ${track.title}`);
          }}
        />
      </motion.div>

      {/* Playlist Manager */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <PlaylistManager />
      </motion.div>
    </div>
  );
}
