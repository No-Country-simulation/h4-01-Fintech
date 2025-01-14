import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    Apple({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/auth/social-login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: account?.type,
              provider: account?.provider,
              providerAccountId: account?.providerAccountId,
              refresh_token: account?.refresh_token,
              access_token: account?.access_token,
              expires_at: account?.expires_at,
              token_type: account?.token_type,
              email: user.email,
              image: user.image,
              name: user.name,
            }),
          }
        );

        if (!response.ok) {
          console.error("Error al iniciar sesión con el backend");
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error en la comunicación con el backend:", error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
        token.access_token = account.access_token;
        token.expires_at = account.expires_at;
      }

      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.provider = token.provider as string | undefined;
      session.user.providerAccountId = token.providerAccountId as
        | string
        | undefined;
      session.user.access_token = token.access_token as string | undefined;
      session.user.expires_at = token.expires_at as string | undefined;
      session.user.email = token.email as string;
      session.user.name = token.name as string | undefined;
      session.user.image = token.image as string | undefined;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  // descomenta las lineas de abajo cuando se cree una ruta login
  // pages: {
  //   signIn: "/login",
  // },
});
