import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { createSession } from "@/handlers/auth/session";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        try {
          const formData = new FormData();
          formData.append("username", credentials.username);
          formData.append("password", credentials.password);
          const response = await fetch(
            `${process.env.API_BASE_URL}/authentication/login`,
            {
              method: "POST",
              body: formData,
            },
          );

          const { data } = await response.json();

          console.log(data, "<<<<<<<");

          const user = {
            id: data?.id,
            name: data?.name,
            username: data?.username,
            email: data?.email,
            image: data?.avatar,
            roles: data?.roles,
            accessToken: data?.token,
          };

          if (!data) {
            return Promise.resolve(null);
          }

          return Promise.resolve(user);
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    {
      id: "sso",
      name: "sso",
      type: "oauth",
      version: "2.0",

      authorization: {
        url: `${process.env.NEXT_PUBLIC_SSO_BASE_URL}/oauth/authorize`,
        params: { scope: "" },
      },
      token: {
        url: `${process.env.NEXT_PUBLIC_SSO_BASE_URL}/oauth/token`,
      },
      userinfo: `${process.env.NEXT_PUBLIC_SSO_BASE_URL}/api/users/profile`,
      clientId: process.env.NEXT_PUBLIC_SSO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SSO_CLIENT_SECRET,
      checks: "state",
      async profile(profile, tokens) {
        const response = await createSession(tokens);

        // error handling at backend API
        if (response.error) {
          console.log(response.message, "<<<<< ERROR");
          throw new Error(response.message);
        }

        return {
          id: profile.data.id,
          name: profile.data.name,
          username: profile.data.username,
          email: profile.data.email,
          emailVerifiedAt: profile.data.email_verified_at,
          avatar: profile.data.avatar_url,
          google_avatar: profile.data.google_avatar,
          roles: profile.data.roles,
          accessToken: response?.data?.token,
        };
      },
      httpOptions: {
        timeout: 10000,
      },
    },
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user?.id;
        token.name = user?.name;
        token.username = user?.username;
        token.email = user?.email;
        token.emailVerifiedAt = user?.emailVerifiedAt;
        token.avatar = user?.avatar;
        token.biodataId = user?.biodataId;
        token.roles = user?.roles;
        token.accessToken = user?.accessToken;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {};
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.avatar = token.avatar;
        session.user.biodataId = token.biodataId;
        session.user.roles = token.roles;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      const redirectUrl = url.startsWith("/")
        ? new URL(url, baseUrl).toString()
        : url;
      return redirectUrl;
    },
  },
};
