// next-auth.d.ts
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    token?:string
    provider?: string;
    providerAccountId?: string;
    access_token: string;
  }

  interface Session {
    user: {
      id?: string;
      token?: string;
      name?: string ;
      email?: string ;
      image?: string ;
      provider?: string ;
      access_token?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    provider?: string;
    providerAccountId?: string;
  }
}
