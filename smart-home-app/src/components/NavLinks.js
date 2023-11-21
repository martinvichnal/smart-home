"use client"

import Link from "next/link"
import clsx from "clsx"
import { redirect, usePathname } from "next/navigation"
import { useGetUserInfo } from "@/hooks/useGetUserInfo"
import { AuthSignInWithGoogle, AuthSignOut } from "@/components/AuthActions"
import { useEffect, useState } from "react"
import { revalidatePath } from "next/cache"
const { uIsAuth, uName, uid } = useGetUserInfo()
const links = [
    { name: "Home", href: "/" },
    { name: "Devices", href: `/devices/${uid}` },
    { name: "Testing", href: "/tester" },
    { name: "Settings", href: "/" },
    { name: "API / Users", href: "/api/auth" },
    { name: "API / Device", href: "/api/device" },
    {
        name: "API / Device with ID",
        href: "/api/device?did=72ca9db90d31439dbf540c48b07abdb6",
    },
]

export default function NavLinks() {
    const [name, setName] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setName(uName)
        setLoggedIn(uIsAuth)
    }, [])

    const signOutAction = () => {
        console.log("Signing out action triggered")
        AuthSignOut()
        return redirect(`/`)
    }

    const signInAction = () => {
        console.log("redirecting to auth")
        redirect(`/auth`)
    }

    return (
        <>
            <div className="">
                {links.map((link) => {
                    // const LinkIcon = link.icon
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                " flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 mb-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                {
                                    "bg-sky-100 text-blue-600":
                                        pathname === link.href,
                                }
                            )}
                        >
                            <p className="hidden md:block">{link.name}</p>
                        </Link>
                    )
                })}
            </div>
            <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
            <div>
                {loggedIn ? (
                    <div>
                        <p>You are logged in as: {name}</p>
                        <button
                            className={clsx(
                                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                {
                                    "bg-sky-100 text-blue-600": true,
                                }
                            )}
                            onClick={() => signOutAction()}
                        >
                            Sign out
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>You are not logged in</p>
                        <button
                            className={clsx(
                                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                {
                                    "bg-sky-100 text-blue-600": false,
                                }
                            )}
                            onClick={() => redirect(`/auth`)}
                        >
                            Sign in
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
