import "@/app/globals.css"

export const metadata = {
    title: "Smart Home App",
    description:
        "This is an IoT controller web application created by Martin Vichnal in NextJS and TailwindCSS.",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <main className="bg-orange-50">{children}</main>
            </body>
        </html>
    )
}
