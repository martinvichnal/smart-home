"use client"

import Link from "next/link"
import clsx from "clsx"
import { redirect, usePathname } from "next/navigation"

export default function NavLinks() {
    // const { uIsAuth, uName, uid } = useGetUserInfo()
    const pathname = usePathname()

    const links = [
        { name: "Home", href: "/" },
        { name: "Devices", href: `/devices` },
        { name: "Testing", href: "/testing" },
        { name: "Settings", href: "/" },
        // {
        //     name: "API / Users",
        //     href: `${process.env.API_SERVER_NAME}/api/users`,
        // },
        // {
        //     name: "API / Devices",
        //     href: `${process.env.API_SERVER_NAME}/api/devices`,
        // },
        // {
        //     name: "API / Device with ID",
        //     href: `${process.env.API_SERVER_NAME}/api/devices/deviceDID?did=05b31779-14ee-4233-8c9a-2749e81d3ccb`,
        // },
    ]

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
                {true ? (
                    <div>
                        <p>You are logged in as:</p>
                        <button
                            className={clsx(
                                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                {
                                    "bg-sky-100 text-blue-600": true,
                                }
                            )}
                            // onClick={() => signOutAction()}
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
                            // onClick={() => redirect(`/auth`)}
                        >
                            Sign in
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
