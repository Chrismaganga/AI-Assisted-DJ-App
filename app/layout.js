import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI-Assisted DJ App",
  description:
    "Automatically suggests next track based on tempo/key/mood with AI-powered recommendations",
  keywords: "DJ, AI, Music, Spotify, Beatmatching, Transitions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          {children}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #475569",
            },
          }}
        />
      </body>
    </html>
  );
}
