import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { currentTrack, userPreferences, library } = await request.json();

    // Analyze current track characteristics
    const trackAnalysis = {
      bpm: currentTrack?.bpm || 128,
      key: currentTrack?.key || "C",
      mood: currentTrack?.mood || "energetic",
      energy: currentTrack?.energy || 0.7,
      danceability: currentTrack?.danceability || 0.6,
    };

    // Create prompt for AI recommendations
    const prompt = `
    As an AI DJ assistant, analyze the current track and suggest compatible next tracks.
    
    Current Track Analysis:
    - BPM: ${trackAnalysis.bpm}
    - Key: ${trackAnalysis.key}
    - Mood: ${trackAnalysis.mood}
    - Energy: ${trackAnalysis.energy}
    - Danceability: ${trackAnalysis.danceability}
    
    User Preferences: ${userPreferences || "No specific preferences"}
    
    Available Library: ${library?.length || 0} tracks
    
    Please suggest 5 compatible tracks that would work well as the next song in a DJ set.
    Consider:
    1. BPM compatibility (within ±20 BPM range)
    2. Musical key compatibility
    3. Mood and energy flow
    4. Smooth transitions
    5. Dance floor energy progression
    
    Return the response as a JSON array with the following structure:
    [
      {
        "title": "Track Title",
        "artist": "Artist Name",
        "bpm": 130,
        "key": "D",
        "mood": "energetic",
        "energy": 0.8,
        "danceability": 0.7,
        "compatibility_score": 85,
        "transition_notes": "Brief notes about why this track works well as a transition"
      }
    ]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert DJ and music producer with deep knowledge of music theory, BPM matching, key compatibility, and dance floor dynamics. Provide practical, actionable recommendations for DJ transitions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;

    // Try to parse JSON response
    let recommendations;
    try {
      recommendations = JSON.parse(response);
    } catch (error) {
      // Fallback to mock recommendations if JSON parsing fails
      recommendations = generateMockRecommendations(trackAnalysis);
    }

    return NextResponse.json({
      success: true,
      recommendations,
      analysis: trackAnalysis,
    });
  } catch (error) {
    console.error("AI recommendations error:", error);

    // Fallback to mock recommendations
    const mockRecommendations = generateMockRecommendations({
      bpm: 128,
      key: "C",
      mood: "energetic",
    });

    return NextResponse.json({
      success: false,
      error: "AI service temporarily unavailable",
      recommendations: mockRecommendations,
      fallback: true,
    });
  }
}

function generateMockRecommendations(currentTrack) {
  const mockTracks = [
    {
      title: "Midnight City",
      artist: "M83",
      bpm: currentTrack.bpm + Math.floor(Math.random() * 10) - 5,
      key: getCompatibleKey(currentTrack.key),
      mood: getCompatibleMood(currentTrack.mood),
      energy: 0.8,
      danceability: 0.7,
      compatibility_score: 85 + Math.floor(Math.random() * 15),
      transition_notes: "Smooth energy build with compatible key and BPM",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      bpm: currentTrack.bpm + Math.floor(Math.random() * 10) - 5,
      key: getCompatibleKey(currentTrack.key),
      mood: getCompatibleMood(currentTrack.mood),
      energy: 0.9,
      danceability: 0.8,
      compatibility_score: 90 + Math.floor(Math.random() * 10),
      transition_notes: "High energy track with perfect BPM match",
    },
    {
      title: "Levitating",
      artist: "Dua Lipa",
      bpm: currentTrack.bpm + Math.floor(Math.random() * 10) - 5,
      key: getCompatibleKey(currentTrack.key),
      mood: getCompatibleMood(currentTrack.mood),
      energy: 0.7,
      danceability: 0.9,
      compatibility_score: 80 + Math.floor(Math.random() * 20),
      transition_notes: "Great danceability with smooth mood transition",
    },
  ];

  return mockTracks;
}

function getCompatibleKey(key) {
  const compatibleKeys = {
    C: ["C", "F", "G"],
    D: ["D", "G", "A"],
    E: ["E", "A", "B"],
    F: ["F", "Bb", "C"],
    G: ["G", "C", "D"],
    A: ["A", "D", "E"],
    B: ["B", "E", "F#"],
  };
  const options = compatibleKeys[key] || ["C", "F", "G"];
  return options[Math.floor(Math.random() * options.length)];
}

function getCompatibleMood(mood) {
  const moodGroups = {
    energetic: ["energetic", "upbeat"],
    upbeat: ["energetic", "upbeat", "happy"],
    melancholic: ["melancholic", "dark", "emotional"],
    dark: ["dark", "melancholic"],
    happy: ["happy", "upbeat"],
  };
  const options = moodGroups[mood] || ["energetic", "upbeat"];
  return options[Math.floor(Math.random() * options.length)];
}
