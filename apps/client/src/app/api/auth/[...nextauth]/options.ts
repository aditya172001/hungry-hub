import type { NextAuthOptions, Profile, User as USER } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User, ensureDbConnection } from "db";
import bcrypt from "bcryptjs";
import { singinSchema } from "validation";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "Enter your email id",
        },
        password: {
          label: "Password:",
          type: "text",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        //add bcrypt or any other hashing and salting process for password
        try {
          const parsedUser = singinSchema.safeParse({
            email: credentials?.email,
            password: credentials?.password,
          });
          if (!parsedUser.success) return null;
          let user;
          if (credentials) {
            await ensureDbConnection();
            user = await User.findOne({ email: parsedUser.data.email });
            const userValid = await bcrypt.compare(
              parsedUser.data.password,
              user.password
            );
            if (userValid) return user;
          }
          return null;
        } catch (error) {
          console.error("Error in validating user", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }: any) {
      try {
        //if oauth provider is used
        if (profile) {
          await ensureDbConnection();
          const existingUser = await User.findOne({ email: profile.email });
          if (existingUser) return true;
          else {
            const newUser = new User({
              userName: profile.name,
              email: profile.email,
              profilePicture: profile.picture,
              userType: "user",
            });
            const savedUser = await newUser.save();
            if (savedUser) return true;
            else return false;
          }
        }
        //if oauth provider is not used but credential is used.
        return true;
      } catch (error) {
        console.error("error in nextauth signin callback", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
};
