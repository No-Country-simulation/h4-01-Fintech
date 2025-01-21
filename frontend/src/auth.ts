import NextAuth, { User as NextAuthUser } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { MyEnv } from './utils/envs'

// Extend the User type to include the role property
interface User extends NextAuthUser {
  role?: string;
  access_token: string;
  token?: string;
}

// respuesta de backend
interface DataRespuesta {
  status: boolean,
  message: string,
  token: string,
  data: {
    id: string;
  name: string;
  email: string;
  role: string;
  }
}



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
      async profile(profile) {
        // Google no devuelve el access_token directamente, se obtiene durante el flujo
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          access_token: profile.access_token, // Asumimos que el access_token se obtiene desde la respuesta de Google
        }
      },
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null
          const response = await fetch(`${MyEnv.API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })

          if (!response.ok) {
            console.error('Error en la autenticación de credenciales')
            return null
          }

          const user: DataRespuesta = await response.json()

          if (!user || !user.data || !user.token) {
            console.error('Usuario no válido devuelto por el backend')
            return null
          }
          console.log('esta es la respues con credenciales', user)

          // Asociar la respuesta del backend con la estructura de usuario

          return {
            id: user.data.id,
            name: user.data.name,
            email: user.data.email,
            role: user.data.role,
            access_token: user.token,
            token: user.token,
          }
        } catch (error) {
          console.error('Error en la autenticación de credenciales:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials' && user) {
          console.log('Inicio de sesión con credenciales exitoso')
          // Realizar un POST al backend para registrar o actualizar el usuario con las credenciales
          const resp = await fetch(`${MyEnv.API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: account?.type,
              provider: account?.provider,
              providerAccountId: account?.providerAccountId,
              email: user.email,
              image: user.image,
              name: user.name,
            }),
          })
          const userSocial: DataRespuesta = await resp.json()
          console.log('esta es la respuesta con credenciales', userSocial)
          return true
        }

        if (account?.provider === 'google' && user) {
          console.log('Inicio de sesión con Google exitoso')
          // Realizar un POST al backend para registrar o actualizar el usuario con los datos de Google
          const respSocial = await fetch(
            `${MyEnv.API_URL}/api/auth/social-login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: account?.type,
                provider: account?.provider,
                providerAccountId: account?.providerAccountId,
                email: user.email,
                image: user.image,
                name: user.name,
              }),
            }
          )
          const userSocial: DataRespuesta = await respSocial.json()
          console.log('esta es la respuesta con credenciales', userSocial)
          return true
        }

        return false
      } catch (error) {
        console.error('Error al iniciar sesión con el backend:', error)
        return false
      }
    },
    async jwt({ token, account, user }) {
      // Si el account y el user están disponibles (en el caso de un login exitoso)
      if (account && user) {
        // Guardamos los valores del usuario y el token en el JWT
        token.token = user.token // Este es el token que viene del backend
        token.name = user.name
        token.email = user.email
        token.image = user.image
        token.role = (user as User).role // Si tienes rol, también puedes guardarlo
      }
      return token
    },
    async session({ session, token }) {
      session.user.access_token = token.access_token as string
      session.user.email = token.email as string
      session.user.name = token.name as string | undefined
      session.user.image = token.image as string | undefined
      session.user.id = token.id as string
      session.user.provider = token.provider as string | undefined
      session.user.token = token.token as string
      ;(session.user.role = token.role as string),
        (session.user.token = token.token as string)
      console.log(
        'session del usuario',
        session,
        'y este es el Token',
        session.user.token
      )
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirige al home después de iniciar sesión
      if (url === '/auth/login' || url === baseUrl) {
        return '/'
      }
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    error: '/error',
  },
})
