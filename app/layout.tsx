import "./globals.css";
import { Inter } from "next/font/google";
import { EXAMPLE_PATH, CMS_NAME } from "@/lib/constants";
import Image from "next/image";

export const metadata = {
  title: `InnoLab - Innovation Laboratory`,
  description: `Санаанаас Бодит Биет Хүртэлх Аялал.`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function Header() {
  return (
    <header className="bg-accent-1 border-b border-accent-2">
      <div className="container mx-auto px-5">
        <div className="py-6 flex items-center justify-between">
          <a href="/">
            <img src="/assets/innolab_logo.svg" alt="InnoLab Logo" width="149" height="64" />
          </a>

          <input id="menu-toggle" type="checkbox" className="hidden peer" />
          <label htmlFor="menu-toggle" className="md:hidden block cursor-pointer z-50">
            <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-700"></div>
          </label>

          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="/" className="text-gray-700 hover:text-gray-900">Нүүр</a></li>
              <li><a href="/posts" className="text-gray-700 hover:text-gray-900">Блог</a></li>
              <li><a href="/courses" className="text-gray-700 hover:text-gray-900">Сургалт</a></li>
              <li><a href="/products" className="text-gray-700 hover:text-gray-900">Дэлгүүр</a></li>
            </ul>
          </nav>

          <nav
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out md:hidden"
          >
            <ul className="p-5 space-y-4 pt-20">
              <li><a href="/" className="text-gray-700 hover:text-gray-900">Нүүр</a></li>
              <li><a href="/posts" className="text-gray-700 hover:text-gray-900">Блог</a></li>
              <li><a href="/courses" className="text-gray-700 hover:text-gray-900">Сургалт</a></li>
              <li><a href="/products" className="text-gray-700 hover:text-gray-900">Дэлгүүр</a></li>
            </ul>
          </nav>

          <div
            className="fixed inset-0 bg-black opacity-50 z-30 hidden peer-checked:block md:hidden"
          ></div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <Image src={`/assets/innolab_logo.svg`} unoptimized alt="InnoLab Logo" width="149" height="64" /> 
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section className="min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
