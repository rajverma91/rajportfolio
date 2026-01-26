import { Roboto, Noto_Serif_Gurmukhi } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto " ,
});

const notoGurmukhi = Noto_Serif_Gurmukhi({
  subsets: ["gurmukhi", "latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-gurmukhi",
});

export const metadata = {
  title: "Raj Verma — Crafting Modern Web Experiences",
  description:
    "Portfolio of Raj Verma, a London-based frontend developer with a decade of experience creating scalable and user-focused web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${notoGurmukhi.variable}`}>
      <body className="leading-8 dark:bg-darkTheme dark:text-white font-roboto">
        {children}
      </body>
    </html>
  );
}
