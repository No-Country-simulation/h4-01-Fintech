// next-auth.d.ts
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    provider?: string;
    providerAccountId?: string;
  }

  interface Session {
    user: {
      name?: string ;
      email?: string ;
      image?: string ;
      provider?: string ;
      access_token?: string;
      expires_at?: string;


    } & DefaultSession["user"];
  }

  interface JWT {
    provider?: string;
    providerAccountId?: string;
  }
}
