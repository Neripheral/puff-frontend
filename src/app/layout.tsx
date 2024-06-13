import '@/app/global.css';

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
      <body>{children}</body>
    </html>
  )
}
