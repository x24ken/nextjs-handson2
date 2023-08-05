import { Suspense } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Loading } from "../lib/component/Loading";

export const metadata: Metadata = {
  title: "写真を検索できるサイト",
  description: "いい感じの写真を検索できるサイトです",
};

/* fontの設定 */
const notoSansJp400 = Noto_Sans_JP({
  weight: "400",
  display: "swap",
  preload: true,
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJp400.className}>
      <body>
        <header className="h-16 bg-transparent backdrop-blur-md flex fixed w-full px-6 top-0">
          <div className="h-auto my-auto font-bold text-5xl tracking-tighter">
            写真を検索できるサイト
          </div>
        </header>
        <main className="pt-20 pb-8 bg-gray-950 min-h-screen">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}
