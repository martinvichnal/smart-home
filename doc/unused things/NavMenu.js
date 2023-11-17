"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

const ACTIVE_ROUTE =
    "flex items-center p-2 text-gray-900 bg-gray-600 rounded-lg text-white dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 group"
const INACTIVE_ROUTE =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"

function AuthButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <button className={INACTIVE_ROUTE} onClick={() => signOut()}>
                    Sign out
                </button>
            </>
        )
    }
    return (
        <>
            <button className={INACTIVE_ROUTE} onClick={() => signIn()}>
                Sign in
            </button>
        </>
    )
}

export default function NavMenu() {
    const pathname = usePathname()
    const [name, setName] = useState()

    useEffect(() => {
        fetch("/api/auth")
            .then((res) => res.json())
            .then((data) => setName(data.name))
    }, [])

    return (
        <div>
            <aside
                id="cta-button-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <p className="m-4">{name}</p>
                    <ul className="space-y-2 font-medium">
                        <li
                            className={
                                pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE
                            }
                        >
                            <Link href="/">
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === "/devices"
                                    ? ACTIVE_ROUTE
                                    : INACTIVE_ROUTE
                            }
                        >
                            <Link href="/devices">
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Devices
                                </span>
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === "/settings"
                                    ? ACTIVE_ROUTE
                                    : INACTIVE_ROUTE
                            }
                        >
                            <AuthButton />
                        </li>
                    </ul>
                    <div
                        id="dropdown-cta"
                        className="p-4 mt-12 rounded-lg bg-blue-50 dark:bg-blue-900"
                        role="alert"
                    >
                        <div className="flex items-center mb-3">
                            <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                                Beta
                            </span>
                        </div>
                        <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                            This app is currently in a testing version. Please
                            report any bugs or issues you find. Thank you!
                        </p>
                    </div>
                </div>
            </aside>
        </div>
    )
}
