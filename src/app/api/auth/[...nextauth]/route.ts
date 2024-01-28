import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// By passing authOptions, NextAuth provides a set of default endpoints
const handler = NextAuth(authOptions);

// export default handler
export { handler as GET, handler as POST };
