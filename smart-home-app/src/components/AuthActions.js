import { auth, provider } from "../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { revalidatePath } from "next/cache"
import { useGetUserInfo } from "../hooks/useGetUserInfo"
const { setUserDataToLocalStorage } = useGetUserInfo()

export async function AuthSignInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider)
        console.log("Signed in with Google")
        console.log("result", result)
        setUserDataToLocalStorage({
            uid: result.user.uid,
            uName: result.user.displayName,
            uPhoto: result.user.photoURL,
            uIsAuth: true,
        })
        // revalidatePath("/")
    } catch (error) {
        console.error("Error signing in with Google", error)
    }
}

export async function AuthSignOut() {
    try {
        auth.signOut()
        console.log("Signed Out with Google")
        setUserDataToLocalStorage({
            uid: null,
            uName: null,
            uPhoto: null,
            uIsAuth: false,
        })
        // revalidatePath("/")
        return
    } catch (error) {
        console.error("Error signing out with Google", error)
    }
}
