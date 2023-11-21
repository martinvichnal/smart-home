import SideNav from "../components/SideNav"

export default function Home() {
    return (
        <div
            className="flex h-screen flex-col md:flex-row md:overflow-hidden"
            id="home"
        >
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                <h1 className="text-4xl text-center">
                    Wellcome to the smart home app!
                </h1>
                <p className="mt-4 text-center">
                    This is a demo app for my smart home system project. Click
                    on Devices on the menu or go to /devices to see the devices.
                    You have te logged in to see the devices, otherwise you will
                    be redirected to the login page.
                </p>
            </div>
        </div>
    )
}
