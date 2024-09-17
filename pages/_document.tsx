import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <script
        src="https://app.10xlaunch.ai/widget"
        data-app-id="9a1f1e5f-da18-4bd2-8691-45c850955dc0"
        async
        defer
      ></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
