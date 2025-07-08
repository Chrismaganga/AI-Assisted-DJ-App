"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  List,
  Plus,
  Search,
  Music,
  Heart,
  Play,
  MoreVertical,
  Shuffle,
  Repeat,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";

export default function PlaylistManager() {
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: "House Classics",
      tracks: 24,
      duration: "1h 32m",
      image: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    },
    {
      id: 2,
      name: "Chill Vibes",
      tracks: 18,
      duration: "1h 15m",
      image: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    },
    {
      id: 3,
      name: "Party Starters",
      tracks: 31,
      duration: "2h 8m",
      image: "https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a2c4b8c4b8b8b",
    },
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreatePlaylist = () => {
    const newPlaylist = {
      id: Date.now(),
      name: `New Playlist ${playlists.length + 1}`,
      tracks: 0,
      duration: "0m",
      image: null,
    };
    setPlaylists([...playlists, newPlaylist]);
    toast.success("New playlist created!");
  };

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="dj-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <List className="w-6 h-6 text-neon-blue" />
          <h2 className="text-2xl font-bold text-gradient">Playlist Manager</h2>
        </div>
        <button
          onClick={handleCreatePlaylist}
          className="dj-button text-sm py-2 px-4"
        >
          <Plus className="w-4 h-4" />
          New Playlist
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
        <input
          type="text"
          placeholder="Search playlists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg 
                   text-white placeholder-dark-400 focus:outline-none focus:border-neon-blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Playlists List */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Your Playlists</h3>
          <div className="space-y-3">
            {filteredPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                onClick={() => handlePlaylistSelect(playlist)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedPlaylist?.id === playlist.id
                    ? "bg-neon-blue/20 border border-neon-blue"
                    : "bg-dark-700/30 hover:bg-dark-700/50 border border-transparent"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark-600 flex items-center justify-center">
                    {playlist.image ? (
                      <img
                        src={playlist.image}
                        alt={playlist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="w-6 h-6 text-dark-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{playlist.name}</h4>
                    <p className="text-xs text-dark-300">
                      {playlist.tracks} tracks • {playlist.duration}
                    </p>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full bg-dark-600 text-dark-300 
                                   flex items-center justify-center hover:bg-neon-blue hover:text-white transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Playlist Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Playlist Details</h3>
          {selectedPlaylist ? (
            <div className="space-y-4">
              {/* Playlist Header */}
              <div className="p-4 bg-dark-700/50 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-dark-600 flex items-center justify-center">
                    {selectedPlaylist.image ? (
                      <img
                        src={selectedPlaylist.image}
                        alt={selectedPlaylist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="w-10 h-10 text-dark-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">
                      {selectedPlaylist.name}
                    </h4>
                    <p className="text-sm text-dark-300">
                      {selectedPlaylist.tracks} tracks •{" "}
                      {selectedPlaylist.duration}
                    </p>
                  </div>
                </div>

                {/* Playlist Actions */}
                <div className="flex items-center space-x-2">
                  <button className="dj-button text-sm py-2 px-4">
                    <Play className="w-4 h-4" />
                    Play All
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-dark-600 text-dark-300 
                                   flex items-center justify-center hover:bg-neon-pink hover:text-white transition-colors"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-dark-600 text-dark-300 
                                   flex items-center justify-center hover:bg-neon-blue hover:text-white transition-colors"
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-dark-600 text-dark-300 
                                   flex items-center justify-center hover:bg-neon-green hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sample Tracks */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Sample Tracks</h4>
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 bg-dark-700/30 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded bg-dark-600 flex items-center justify-center">
                      <Music className="w-5 h-5 text-dark-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Track {i + 1}</p>
                      <p className="text-xs text-dark-300">Artist {i + 1}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-6 h-6 rounded-full bg-dark-600 text-dark-300 
                                       flex items-center justify-center hover:bg-neon-blue hover:text-white transition-colors"
                      >
                        <Play className="w-3 h-3" />
                      </button>
                      <button
                        className="w-6 h-6 rounded-full bg-dark-600 text-dark-300 
                                       flex items-center justify-center hover:bg-neon-pink hover:text-white transition-colors"
                      >
                        <Heart className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Music className="w-12 h-12 mx-auto mb-4 text-dark-400" />
              <p className="text-dark-300">Select a playlist to view details</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
