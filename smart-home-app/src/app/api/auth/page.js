// "use client"

// // Database imports
// import { auth, provider } from "../../config/firebase-config"
// import { signInWithPopup } from "firebase/auth"
// // React router
// import Link from "next/link"
// // import { useRouter } from "next/navigation"
// import { useRouter, redirect } from "next/navigation"
// // Custom hooks
// import { useGetUserInfo } from "../../hooks/useGetUserInfo"

// export const Auth = () => {
//     // const navigate = useNavigate()
//     const { uIsAuth, setUserDataToLocalStorage } = useGetUserInfo()
//     const router = useRouter()

//     const signInWithGoogle = async () => {
//         const results = await signInWithPopup(auth, provider)

//         // Saving user info to local storage
//         setUserDataToLocalStorage({
//             uid: results.user.uid,
//             uName: results.user.displayName,
//             uPhoto: results.user.photoURL,
//             uIsAuth: true,
//         })
//     }

//     if (uIsAuth) {
//         // return <Link href="/home" />
//         // return router.push("/home")
//         return redirect("/")
//     } else {
//         return (
//             <div className="" id="auth">
//                 <h1>Auth</h1>
//                 <button onClick={signInWithGoogle}>
//                     {""}
//                     Sign in with google
//                 </button>
//             </div>
//         )
//     }
// }

// export default Auth
