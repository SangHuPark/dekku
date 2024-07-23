// app/layout.js
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/globals.css';

export const metadata = {
  title: 'Next Dekku',
  description: 'A Next.js project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
