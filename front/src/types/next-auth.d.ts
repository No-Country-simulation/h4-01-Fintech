// next-auth.d.ts
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    provider?: string;
    providerAccountId?: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string ;
    } & DefaultSession["user"];
  }

  interface JWT {
    provider?: string;
    providerAccountId?: string;
  }
}
