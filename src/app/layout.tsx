import '@/app/global.css';
import {Footer} from "@/app/footer";
import {Header} from "@/app/header";

export const metadata = {
  title: 'Upload File',
  description: 'Upload file to the Puff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
