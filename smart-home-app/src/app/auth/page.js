"use client"

// React router
import Link from "next/link"
import { useRouter, redirect } from "next/navigation"
import { useGetUserInfo } from "../../hooks/useGetUserInfo"
import { AuthSignInWithGoogle, AuthSignOut } from "../../components/AuthActions"

export const Auth = () => {
    // const navigate = useNavigate()
    const { uIsAuth, setUserDataToLocalStorage, uid } = useGetUserInfo()
    const router = useRouter()

    const signInAction = () => {
        console.log("Signing in action triggered")
        AuthSignInWithGoogle()
        return redirect(`/devices/${uid}`)
    }

    if (uIsAuth) {
        return redirect(`/devices/${uid}`)
    } else {
        return (
            <div className="" id="auth">
                <p>You are not logged in</p>
                <button
                    className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    onClick={() => signInAction()}
                >
                    Sign in
                </button>
            </div>
        )
    }
}

export default Auth
