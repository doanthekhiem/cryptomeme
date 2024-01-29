import "./globals.css";
import View from "@/app/ui/dashboard/View/page";
import Left from "@/app/dashboard/Left/page";
import Theming from "@/components/providers/Theme";
import Link from "next/link";
import { PiArrowLeftThin } from "react-icons/pi";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
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
