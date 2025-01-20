import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { env } from "@/constants/envs";


export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    Google({
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "correo@ejemplo.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${env.API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!response.ok) {
            console.error("Error en la autenticación de credenciales");
            return null;
          }

          const user = await response.json();

          if (!user || !user.id) {
            console.error("Usuario no válido devuelto por el backend");
            return null;
          }

          return { ...user, token: user.token };
        } catch (error) {
          console.error("Error en la autenticación de credenciales:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials" && user) {
          console.error("Error: El proveedor no devolvió una cuenta válida");
          return true;
        }
        console.log("url", `${env.API_URL}/api/auth/social-login`);
        const response = await fetch(`${env.API_URL}/api/auth/social-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: account?.type,
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
            email: user.email,
            image: user.image,
            name: user.name,
          }),
        });

        if (!response.ok) {
          console.error("Error al iniciar sesión con el backend");
          return false;
        }

        const userData = await response.json();
        if (userData.id && userData.token) {
          // Almacenar el id del usuario que devuelve el backend
          user.id = userData.id;
          user.token = userData.token; // Si tienes un token JWT del backend
        }
        console.log("datos desde el backend", userData);
        return true;
        //
      } catch (error) {
        console.error("Error en la comunicación con el backend:", error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.access_token = account.access_token || user?.access_token;
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
        token.image = user?.image;
        token.name = user?.name;
        token.email = user?.email;
        token.id = user?.id;
        token.token = user?.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.access_token = token.access_token as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string | undefined;
      session.user.image = token.image as string | undefined;
      session.user.id = token.id as string;
      session.user.provider = token.provider as string | undefined;
      session.user.token = token.token as string;
      console.log("sessiondel usuario", session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) {
        return baseUrl; 
      }
      return baseUrl; 
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  // descomenta las lineas de abajo cuando se cree una ruta login
  pages: {
    signIn: "/auth/login",
    error: "/error",
  },
});
