import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quizzeur",
  description: "Quizz app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap"
      />
      <body className={inter.className} style={{ backgroundColor: "#35006b" }}>
        {children}
      </body>
    </html>
  );
}
