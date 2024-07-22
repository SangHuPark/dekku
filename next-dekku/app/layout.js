// app/layout.js
import './styles/globals.css'
import Layout from './components/Layout'

export const metadata = {
  title: 'Next Dekku',
  description: 'A Next.js project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
