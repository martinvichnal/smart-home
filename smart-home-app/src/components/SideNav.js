import NavLinks from "./NavLinks"
import { signIn, signOut, useSession } from "next-auth/react"
import { getServerSession } from "next-auth"

export default async function SideNav() {
    const session = await getServerSession()

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-100">
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                {session?.user?.name ? (
                    <div className="pb-4">Wellcome {session?.user?.name}!</div>
                ) : (
                    <div className="pb-4">Not logged in</div>
                )}
                <NavLinks />
            </div>
        </div>
    )
}
