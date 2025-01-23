// next-auth.d.ts
import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    token?: string
    provider?: string
    providerAccountId?: string
  }

  interface Account {}

  interface Session {
    user: {
      id?: string;
      token?: string;
      name?: string;
      email?: string;
      image?: string;
      provider?: string;
      access_token?: string;
      role: string;
      risk_percentage: number
    } & DefaultSession['user']
  }

  import { JWT } from 'next-auth/jwt'

  declare module 'next-auth/jwt' {
    interface JWT {
      provider?: string
      providerAccountId?: string
    }
  }
}
