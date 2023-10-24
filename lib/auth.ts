import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { EmailRegisterTemplate } from "@/components/email-templates/register"
import { EmailSignInTemplate } from "@/components/email-templates/signin"

import { resend } from "./resend"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      from: env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        })

        const Template = user?.emailVerified
          ? EmailSignInTemplate({
              magicLink: url,
              productName: siteConfig.short_name,
            })
          : EmailRegisterTemplate({
              magicLink: url,
              productName: siteConfig.short_name,
            })

        try {
          await resend.emails.send({
            from: `MarkDX <${env.SMTP_FROM}>`,
            to: [identifier],
            subject: user?.emailVerified
              ? `Sign in to ${siteConfig.short_name}`
              : `Welcome to ${siteConfig.short_name}`,
            react: Template,
          })
        } catch (error) {
          throw new Error(
            `An error occurred while sending the email: ${
              (error as Error).message
            }`
          )
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
