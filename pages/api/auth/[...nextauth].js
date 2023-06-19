import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'Email' },
        password: { label: 'password', type: 'password', placeholder: 'Password' },
      },
      authorize: async (credentials, req) => {
        const response = await axios.post('http://localhost:3000/api/signin', credentials, {
          headers: {
            Cookie: req.headers.cookie
          }
        })

        const user = response.data
        // console.log({ user })
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...user, ...token };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  }
})