"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Spotify, Brain, Zap } from "lucide-react";
import toast from "react-hot-toast";

export default function SpotifyAuth({ onAuth }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSpotifyLogin = async () => {
    setIsLoading(true);

    // Simulate Spotify OAuth flow
    setTimeout(() => {
      // In a real app, this would redirect to Spotify OAuth
      localStorage.setItem("spotify_token", "mock_token_123");
      setIsLoading(false);
      onAuth(true);
      toast.success("Successfully connected to Spotify!");
    }, 2000);
  };

  return (
    <motion.div
      className="max-w-md w-full mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dj-card text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="vinyl-record animate-spin-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-8 h-8 text-neon-blue" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gradient mb-4">
          AI-Assisted DJ
        </h1>
        <p className="text-dark-300 mb-8">
          Automatically suggests next track based on tempo/key/mood
        </p>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-sm">
            <Zap className="w-5 h-5 text-neon-green" />
            <span>AI-powered track recommendations</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Music className="w-5 h-5 text-neon-blue" />
            <span>Automatic beatmatching and transitions</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Brain className="w-5 h-5 text-neon-pink" />
            <span>Mood and energy analysis</span>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleSpotifyLogin}
          disabled={isLoading}
          className="w-full dj-button py-4 text-lg font-semibold flex items-center justify-center space-x-3"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Spotify className="w-6 h-6" />
              <span>Connect with Spotify</span>
            </>
          )}
        </button>

        {/* Info */}
        <p className="text-xs text-dark-400 mt-6">
          By connecting, you agree to our terms of service and privacy policy
        </p>

        {/* Demo Mode */}
        <div className="mt-8 pt-6 border-t border-dark-600">
          <p className="text-sm text-dark-300 mb-4">Or try demo mode</p>
          <button
            onClick={() => {
              localStorage.setItem("spotify_token", "demo_token");
              onAuth(true);
              toast.success("Demo mode activated!");
            }}
            className="w-full py-3 px-4 bg-dark-700/50 border border-dark-600 rounded-lg 
                     text-white hover:bg-dark-600 transition-colors"
          >
            Continue with Demo
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-xs text-dark-400">
          Powered by Next.js • Tailwind CSS • OpenAI • Spotify API
        </p>
      </div>
    </motion.div>
  );
}
