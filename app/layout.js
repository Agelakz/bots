import './globals.css'

export const metadata = {
  title: 'Bayu & Mutyara - Wedding Invitation',
  description: 'Undangan Pernikahan Bayu & Mutyara',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
