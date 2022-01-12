import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN IS: " + refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from spotifyApi
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,

    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: <string>process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: <string>process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user
    }) {

      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: <number>account.expires_at * 1000 // since it is in ms
        }
      }

      // refresh token

      // return previous token if the access token has not expired yet
      if (Date.now() < (<any>token).accessTokenExpires) {
        console.log("Existing token is valid");
        return token;
      }

      // Access token has expired, we need to refresh it...
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...")
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      (<any>session.user).accessToken = token.accessToken;
      (<any>session.user).refreshToken = token.refreshToken;
      (<any>session.user).username = token.username;
      return session;
    },
  }
})