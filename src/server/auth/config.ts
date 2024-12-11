'use server'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";
import { api } from "~/trpc/server";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
      const {email,password} = credentials as {
        email:string;
        password:string;
       
      }
        const user=await db.user.findFirst({
          where:{
            email:email
          }
        })

        if(!user)
        { console.log("user with this email doesnot exist")
          return null
        }

        if(user.password!= password)
        { console.log("password does not match")
          return null;
        }

        
  
        if (user) {
          return user
        } else {
          return null
          }
      }
    })
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
       
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
