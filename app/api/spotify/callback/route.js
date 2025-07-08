import { NextResponse } from "next/server";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI =
  process.env.SPOTIFY_REDIRECT_URI ||
  "http://localhost:3000/api/spotify/callback";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL("/?error=spotify_auth_failed", request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: SPOTIFY_REDIRECT_URI,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", tokenData);
      return NextResponse.redirect(
        new URL("/?error=token_exchange_failed", request.url)
      );
    }

    // Redirect to frontend with token
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("access_token", tokenData.access_token);
    redirectUrl.searchParams.set("refresh_token", tokenData.refresh_token);
    redirectUrl.searchParams.set("expires_in", tokenData.expires_in);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Spotify callback error:", error);
    return NextResponse.redirect(
      new URL("/?error=callback_error", request.url)
    );
  }
}
