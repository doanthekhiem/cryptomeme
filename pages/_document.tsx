import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* HTML Meta Tags */}
        <title>CryptoMeme</title>
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
