import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/social-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
            email: user.email,
          }),
        }
      );
      return response.ok;
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.provider) {
        session.user.provider = token.provider as string | undefined;
      } else {
        delete session.user.provider; // Elimina la propiedad si no está presente
      }
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
