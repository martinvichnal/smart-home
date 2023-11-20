import NavLinks from "./NavLinks"
// import { signIn, signOut, useSession } from "next-auth/react"
// import { getServerSession } from "next-auth"

export default async function SideNav() {
    // const session = await getServerSession()

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-100">
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                {/* {session?.user?.name ? (
                    <div className="pb-4">Wellcome {session?.user?.name}!</div>
                ) : (
                    <div className="pb-4">Not logged in</div>
                )} */}
                <NavLinks />
                <div
                    id="dropdown-cta"
                    className="p-4 mt-12 rounded-lg bg-blue-50"
                    role="alert"
                >
                    <div className="flex items-center mb-3">
                        <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded">
                            In BETA testing
                        </span>
                    </div>
                    <p className="mb-3 text-sm text-blue-800">
                        This app is currently in production version. Please be
                        aware of any bugs or issues you find and report it.
                        Thank you!
                    </p>
                </div>
            </div>
        </div>
    )
}
