# AI-Assisted DJ App 🎧

A modern, AI-powered DJ application built with Next.js, JavaScript, and Tailwind CSS that automatically suggests next tracks based on tempo, key, and mood analysis.

## ✨ Features

### 🎵 Core DJ Features

- **Dual Deck Interface** - Professional DJ setup with two virtual decks
- **Real-time Audio Visualization** - Dynamic waveforms and frequency analysis
- **Beatmatching Tools** - BPM detection and pitch control
- **Transition Suggestions** - AI-powered track compatibility analysis

### 🤖 AI-Powered Recommendations

- **Smart Track Suggestions** - Based on current BPM, key, and mood
- **Compatibility Scoring** - AI analyzes track compatibility for smooth transitions
- **Mood Analysis** - Understands emotional flow and energy progression
- **Key Matching** - Musical theory-based key compatibility

### 🎧 Spotify Integration

- **Seamless Authentication** - OAuth flow with Spotify
- **Library Access** - Browse and search your Spotify playlists
- **Track Analysis** - Get detailed audio features from Spotify API
- **Playlist Management** - Create and manage custom playlists

### 🎨 Modern UI/UX

- **Dark Theme** - Professional DJ aesthetic with neon accents
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion powered interactions
- **Real-time Feedback** - Toast notifications and status updates

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Spotify Developer Account
- OpenAI API Key (optional, for AI recommendations)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ai-assisted-dj-app.git
   cd ai-assisted-dj-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` and add your API keys:

   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Add `http://localhost:3000/api/spotify/callback` to Redirect URIs
4. Copy Client ID and Client Secret to your `.env.local`

### OpenAI API Setup (Optional)

1. Get an API key from [OpenAI Platform](https://platform.openai.com/)
2. Add it to your `.env.local` file
3. The app will use mock recommendations if no API key is provided

## 🎛️ How to Use

### Basic DJ Controls

1. **Connect to Spotify** - Click "Connect with Spotify" or use demo mode
2. **Load a Track** - Select a track from your library or AI recommendations
3. **Control Playback** - Use play/pause, pitch control, and volume sliders
4. **View Visualizations** - Watch real-time audio analysis and waveforms

### AI Recommendations

1. **Current Track Analysis** - The AI analyzes your current track's characteristics
2. **Compatibility Scoring** - See how well suggested tracks match your current track
3. **Filter Options** - Filter recommendations by mood, energy, or compatibility
4. **One-Click Loading** - Click any recommendation to load it to a deck

### Playlist Management

1. **Browse Playlists** - View your Spotify playlists and saved tracks
2. **Create New Playlists** - Build custom playlists for different occasions
3. **Search and Filter** - Find specific tracks or playlists quickly
4. **Playlist Actions** - Play, shuffle, or download entire playlists

## 🏗️ Architecture

### Frontend

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend APIs

- **Spotify Web API** - Music library and playback control
- **OpenAI GPT-4** - AI-powered track recommendations
- **Next.js API Routes** - Serverless backend functions

### Key Components

- `DJDeck` - Individual deck interface with controls
- `AIRecommendations` - AI-powered track suggestions
- `AudioVisualizer` - Real-time audio visualization
- `PlaylistManager` - Playlist browsing and management
- `SpotifyAuth` - OAuth authentication flow

## 🎯 AI Features Explained

### Track Compatibility Analysis

The AI analyzes multiple factors to suggest compatible tracks:

1. **BPM Matching** - Finds tracks within ±20 BPM range
2. **Key Compatibility** - Uses musical theory for harmonic mixing
3. **Mood Analysis** - Considers emotional flow and energy progression
4. **Energy Flow** - Maintains dance floor energy throughout the set
5. **Transition Quality** - Suggests smooth, natural transitions

### Musical Theory Integration

- **Circle of Fifths** - For key compatibility
- **Relative Keys** - For smooth harmonic transitions
- **Energy Progression** - Building and releasing tension
- **Dance Floor Dynamics** - Understanding crowd energy

## 🎨 Customization

### Styling

The app uses Tailwind CSS with custom design tokens:

- **Color Palette** - Dark theme with neon accents
- **Animations** - Smooth transitions and micro-interactions
- **Responsive Design** - Mobile-first approach

### Adding New Features

1. **New Audio Effects** - Extend the `AudioVisualizer` component
2. **Additional AI Models** - Integrate different AI services
3. **More Music Sources** - Add YouTube, SoundCloud, etc.
4. **Hardware Integration** - Connect to physical DJ controllers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spotify** - For the comprehensive music API
- **OpenAI** - For AI-powered recommendations
- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS approach
- **Framer Motion** - For smooth animations

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ai-assisted-dj-app/issues) page
2. Create a new issue with detailed information
3. Join our [Discord](https://discord.gg/your-server) for community support

## 🔮 Roadmap

- [ ] **Hardware Controller Support** - MIDI and USB controller integration
- [ ] **Live Streaming** - Stream your DJ sets to platforms like Twitch
- [ ] **Collaborative DJing** - Multi-user DJ sessions
- [ ] **Advanced AI Models** - Local ML models for offline recommendations
- [ ] **Mobile App** - React Native version for iOS/Android
- [ ] **Cloud Sync** - Save and sync your DJ sessions across devices

---

**Made with ❤️ by the AI-Assisted DJ Team**
