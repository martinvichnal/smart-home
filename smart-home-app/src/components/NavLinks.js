"use client"

import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    // { name: "Home", href: "/", icon: HomeIcon },
    { name: "Home", href: "/" },
    { name: "Devices", href: "/devices" },
]

export default function NavLinks() {
    const pathname = usePathname()
    const { data: session } = useSession()

    return (
        <>
            <div>
                {links.map((link) => {
                    // const LinkIcon = link.icon
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
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
                {session ? (
                    <button
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-sky-100 text-blue-600": session,
                            }
                        )}
                        onClick={() => signOut()}
                    >
                        Sign out
                    </button>
                ) : (
                    <button
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-sky-100 text-blue-600": session,
                            }
                        )}
                        onClick={() => signIn()}
                    >
                        Sign in
                    </button>
                )}
            </div>
        </>
    )
}
