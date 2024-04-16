import supabase from "@/utils/supabaseClient"

class AuthService {
    async signInWithEmailAndPassword(email: string, password: string) {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }
    async signInWithOAuth(source: any) {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: source,
            })

            if (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.log("Error logging out:", error.message)
                throw error
            }
        } catch (error) {
            throw error
        }
    }
    async registerUser(email:string, password:string) {
        const { user, error }: any = await supabase.auth.signUp({
          email: email,
          password: password
        })
        if (error) {
          console.log(error)
        } else {
          console.log(user)
        }
      }
}

export default new AuthService()
