import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";

// Extend the session to include the user id
declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // Now the id property is recognized
    } & DefaultSession["user"];
  }
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Check if `session.user` is truthy
        session.user.id = token.sub; // Safely add the Google user ID to the session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
