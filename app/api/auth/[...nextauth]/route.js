import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    await connectDB();
                    const user = await User.findOne({ username: credentials.username })

                    if (!user) {
                        console.log('Invalid username or password');
                        return null;
                    }

                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        console.log('Invalid username or password');
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log('An error occurred: ', error)
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
            }
            return token;
        }
    },
};

const handler  = NextAuth(authOptions);
export { handler as GET, handler as POST };