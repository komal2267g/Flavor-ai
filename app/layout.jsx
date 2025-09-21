import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "../components/ScrollToTop";
import GoogleTranslateWrapper from "@/components/GoogleTranslateWrapper";
import SnakeCursor from "@/components/SnakeCursor";

const inter = Inter({ subsets: ["latin"] });

const patrickHand = {
  fontFamily: '"Patrick Hand", cursive',
  fallback: [
    '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'sans-serif'
  ]
};

export const metadata = {
  title: "Flavor AI",
  description: "Your multilingual food assistant powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍱</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className} style={patrickHand}>
        <GoogleTranslateWrapper />
        <SnakeCursor />
        {children}
        <ScrollToTop></ScrollToTop>
      </body>
    </html>
  );
}