import Left from "@/app/dashboard/Left/page";
import View from "@/app/ui/dashboard/View/page";
import Theming from "@/components/providers/Theme";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { PiArrowLeftThin } from "react-icons/pi";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Meme Magic: Exploring the Whimsical Side of Crypto</title>
        <meta
          name="description"
          content="Meme cryptocurrencies are digital assets inspired by internet jokes, often gaining popularity and value through social media hype."
        />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://cryptomeme.org" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="CryptoMeme" />
        <meta
          property="og:description"
          content="Meme cryptocurrencies are digital assets inspired by internet jokes, often gaining popularity and value through social media hype."
        />
        <meta
          property="og:image"
          content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v3/cryptomeme.org/CryptoMeme/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Fb38fad09-1861-43ba-b14b-8cdab479c9cf.jpg%3Ftoken%3Dn_QYemwiB99hnietfJExZQi2u_0X3ldujHAIUQKhYeU%26height%3D617%26width%3D1080%26expires%3D33242580999/og.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="cryptomeme.org" />
        <meta property="twitter:url" content="https://cryptomeme.org" />
        <meta name="twitter:title" content="CryptoMeme" />
        <meta
          name="twitter:description"
          content="Meme cryptocurrencies are digital assets inspired by internet jokes, often gaining popularity and value through social media hype."
        />
        <meta
          name="twitter:image"
          content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v3/cryptomeme.org/CryptoMeme/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Fb38fad09-1861-43ba-b14b-8cdab479c9cf.jpg%3Ftoken%3Dn_QYemwiB99hnietfJExZQi2u_0X3ldujHAIUQKhYeU%26height%3D617%26width%3D1080%26expires%3D33242580999/og.png"
        />
        {/* Link Tags for Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="">
        <Analytics />
        <Theming>
          <div className="max-w-[78rem] mx-auto ">
            <div className=" gap-4 flex md:mt-5    flex-col md:flex-row  ">
              <Left />
              <div>
                <div className="sticky top-5 ">
                  <div className=" ">
                    <div className="-mt-6   ">
                      <div className="bg-neutral-700/25 backdrop-blur-md h-10  w-full rounded-xl flex items-center gap-x-7 ">
                        <Link href={"/"}>
                          <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center ml-3">
                            <div className="bg-neutral-300 rounded-full h-5 w-5 flex items-center justify-center">
                              <PiArrowLeftThin className="text-black text-lg" />
                            </div>
                          </div>
                        </Link>

                        <Link href={"/"}>
                          <button className="text-xs text-white bg-neutral-700/25 p-1 w-16 h-6 rounded-md">
                            Home
                          </button>
                        </Link>
                        <Link href={"/tokens"}>
                          <button className="text-xs text-white bg-neutral-700/25 p-1 w-16 h-6 rounded-md">
                            Tokens
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-9">{children}</div>
              </div>
              <View />
            </div>
          </div>
        </Theming>
      </body>
    </html>
  );
}
