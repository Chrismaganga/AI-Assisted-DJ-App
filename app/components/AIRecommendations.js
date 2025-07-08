"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Music, TrendingUp, Heart, Play, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AIRecommendations({
  currentBpm,
  currentKey,
  currentMood,
  onTrackSelect,
}) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock AI recommendations data
  const mockRecommendations = [
    {
      id: 1,
      title: "Midnight City",
      artist: "M83",
      bpm: 128,
      key: "C",
      mood: "energetic",
      energy: 0.8,
      danceability: 0.7,
      image: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
      spotifyUrl: "https://open.spotify.com/track/1eyzqe2QqGZUmfcPZtrIyt",
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      bpm: 171,
      key: "D",
      mood: "energetic",
      energy: 0.9,
      danceability: 0.8,
      image: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
    },
    {
      id: 3,
      title: "Levitating",
      artist: "Dua Lipa",
      bpm: 103,
      key: "F",
      mood: "upbeat",
      energy: 0.7,
      danceability: 0.9,
      image: "https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a2c4b8c4b8b8b",
      spotifyUrl: "https://open.spotify.com/track/39LLxExYz6ewLAcYrzQQyP",
    },
    {
      id: 4,
      title: "As It Was",
      artist: "Harry Styles",
      bpm: 174,
      key: "G",
      mood: "melancholic",
      energy: 0.6,
      danceability: 0.6,
      image: "https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a2c4b8c4b8b8b",
      spotifyUrl: "https://open.spotify.com/track/4LRPiXqCikLlN15c3yImP7",
    },
    {
      id: 5,
      title: "Bad Guy",
      artist: "Billie Eilish",
      bpm: 135,
      key: "A",
      mood: "dark",
      energy: 0.5,
      danceability: 0.7,
      image: "https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a2c4b8c4b8b8b",
      spotifyUrl: "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m",
    },
  ];

  useEffect(() => {
    generateRecommendations();
  }, [currentBpm, currentKey, currentMood]);

  const generateRecommendations = async () => {
    setIsLoading(true);

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Filter recommendations based on current track characteristics
    const filtered = mockRecommendations.filter((track) => {
      const bpmDiff = Math.abs(track.bpm - currentBpm);
      const keyCompatible = isKeyCompatible(track.key, currentKey);
      const moodCompatible = isMoodCompatible(track.mood, currentMood);

      return bpmDiff <= 20 && (keyCompatible || moodCompatible);
    });

    setRecommendations(filtered);
    setIsLoading(false);
    toast.success(`AI found ${filtered.length} compatible tracks!`);
  };

  const isKeyCompatible = (key1, key2) => {
    const compatibleKeys = {
      C: ["C", "F", "G"],
      D: ["D", "G", "A"],
      E: ["E", "A", "B"],
      F: ["F", "Bb", "C"],
      G: ["G", "C", "D"],
      A: ["A", "D", "E"],
      B: ["B", "E", "F#"],
    };
    return (
      compatibleKeys[key1]?.includes(key2) ||
      compatibleKeys[key2]?.includes(key1)
    );
  };

  const isMoodCompatible = (mood1, mood2) => {
    const moodGroups = {
      energetic: ["energetic", "upbeat"],
      upbeat: ["energetic", "upbeat", "happy"],
      melancholic: ["melancholic", "dark", "emotional"],
      dark: ["dark", "melancholic"],
      happy: ["happy", "upbeat"],
    };
    return (
      moodGroups[mood1]?.includes(mood2) || moodGroups[mood2]?.includes(mood1)
    );
  };

  const getCompatibilityScore = (track) => {
    const bpmDiff = Math.abs(track.bpm - currentBpm);
    const keyScore = isKeyCompatible(track.key, currentKey) ? 1 : 0;
    const moodScore = isMoodCompatible(track.mood, currentMood) ? 1 : 0;
    const bpmScore = Math.max(0, 1 - bpmDiff / 50);

    return Math.round(((bpmScore + keyScore + moodScore) / 3) * 100);
  };

  const filteredRecommendations =
    selectedFilter === "all"
      ? recommendations
      : recommendations.filter((track) => track.mood === selectedFilter);

  return (
    <motion.div
      className="dj-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-neon-blue" />
          <h2 className="text-2xl font-bold text-gradient">
            AI Recommendations
          </h2>
        </div>
        <button
          onClick={generateRecommendations}
          disabled={isLoading}
          className="dj-button text-sm py-2 px-4"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <TrendingUp className="w-4 h-4" />
          )}
          {isLoading ? " Analyzing..." : " Refresh"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "energetic", "upbeat", "melancholic", "dark", "happy"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? "bg-neon-blue text-dark-900"
                  : "bg-dark-700 text-dark-300 hover:bg-dark-600"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Current Track Analysis */}
      <div className="mb-6 p-4 bg-dark-700/50 rounded-lg">
        <h3 className="font-semibold mb-3">Current Track Analysis</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-blue">
              {currentBpm}
            </div>
            <div className="text-dark-300">BPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-pink">
              {currentKey}
            </div>
            <div className="text-dark-300">Key</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green capitalize">
              {currentMood}
            </div>
            <div className="text-dark-300">Mood</div>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-neon-blue" />
              <p className="text-dark-300">
                AI is analyzing your music library...
              </p>
            </div>
          </div>
        ) : filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-lg hover:bg-dark-700/50 transition-colors"
            >
              {/* Album Art */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-dark-600 flex items-center justify-center">
                {track.image ? (
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Music className="w-8 h-8 text-dark-400" />
                )}
              </div>

              {/* Track Info */}
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{track.title}</h4>
                <p className="text-xs text-dark-300">{track.artist}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-dark-400">
                  <span>BPM: {track.bpm}</span>
                  <span>Key: {track.key}</span>
                  <span className="capitalize">{track.mood}</span>
                </div>
              </div>

              {/* Compatibility Score */}
              <div className="text-center">
                <div className="text-lg font-bold text-neon-green">
                  {getCompatibilityScore(track)}%
                </div>
                <div className="text-xs text-dark-300">Match</div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onTrackSelect(track)}
                  className="w-8 h-8 rounded-full bg-neon-blue text-dark-900 
                           flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Play className="w-4 h-4" />
                </button>
                <button
                  className="w-8 h-8 rounded-full bg-dark-600 text-dark-300 
                                 flex items-center justify-center hover:bg-neon-pink hover:text-white transition-colors"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <Music className="w-12 h-12 mx-auto mb-4 text-dark-400" />
            <p className="text-dark-300">No compatible tracks found</p>
            <p className="text-sm text-dark-400">
              Try adjusting your current track or refresh recommendations
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
