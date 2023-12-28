import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/app/providers"
import SideNav from "@/components/side-nav/SideNav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Smart Home App",
    description:
        "This is an IoT controller web application created by Martin Vichnal in NextJS and TailwindCSS.",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <main className="bg-orange-50 flex h-screen flex-col md:flex-row md:overflow-hidden">
                        <div className="w-full flex-none md:w-64">
                            <SideNav />
                        </div>
                        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                            {children}
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    )
}

// ;<div className="bg-white flex flex-col justify-center items-center md:w-1/2">
//     <h1 className="text-6xl font-bold">
//         <span className="text-orange-500">C</span>
//         <span className="text-orange-600">N</span>
//         <span className="text-orange-700">A</span>
//     </h1>
//     <p className="text-xl text-gray-500"></p>
// </div>
