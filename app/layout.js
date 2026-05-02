import './globals.css'

export const metadata = {
  title: 'Bayu & Tyara - Wedding Invitation',
  description: 'Undangan Pernikahan Bayu & Tyara',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}