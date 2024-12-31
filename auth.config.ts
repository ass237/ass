
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
 
export default { 
    providers: [Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    })] 

}  satisfies NextAuthConfig 