import "@/app/globals.css"
import SideNav from "@/components/SideNav"

export const metadata = {
    title: "Smart Home App",
    description:
        "This is an IoT controller web application created by Martin Vichnal in NextJS and TailwindCSS.",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <main className="bg-orange-50 flex h-screen flex-col md:flex-row md:overflow-hidden">
                    <div className="w-full flex-none md:w-64">
                        <SideNav />
                    </div>
                    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    )
}
