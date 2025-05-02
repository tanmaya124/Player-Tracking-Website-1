import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

const handler = NextAuth({
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // TODO: Replace this with your actual database lookup
        // This is where you would look up the user in your database
        // For now, we'll simulate a successful login for demo purposes
        // with the credentials matching what we expect from signup
        
        // Mock user data - replace with actual database lookup
        const mockUser = {
          id: "1",
          email: credentials.email,
          name: credentials.email, // Use email as name instead of "Demo User"
          password: await bcrypt.hash(credentials.password, 10), // In reality, this would come from your DB
        };

        const isValid = await bcrypt.compare(credentials.password, mockUser.password);

        if (isValid) {
          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
          };
        }

        throw new Error('Invalid credentials');
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
})

export { handler as GET, handler as POST }