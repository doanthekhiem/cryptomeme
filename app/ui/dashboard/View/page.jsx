"use client";
import { FaTwitter } from "react-icons/fa";
import { SiDiscord, SiReddit, SiTelegram } from "react-icons/si";

import TestimonialTooltip from "@/app/TestimonialTooltip/page";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.9,
          type: "spring",
          stiffness: 200,
        },
      }}
      className="lg:block w-ful lg:w-fit hidden  max-xl:hidden "
    >
      <div className=" md:w-60 w-full rounded-2xl h-fit sticky top-5 ">
        <div>
          <div className="bg-[#1C1C1C] min-w-min rounded-2xl p-4 border border-neutral-800 h-fit">
            <h2 className="font-RubikBold text-neutral-200">
              340+ Meme tokens
            </h2>
            <p className="text-xs my-3 text-neutral-400 font-RubikRegular">
              Explore over 340 meme tokens, the playful pulse of crypto culture.
            </p>
            <Link href={"/tokens"}>
              <button className="bg-[#696969] h-7 p-1 rounded-md text-xs w-full font-RubikMedium text-neutral-50 ">
                Show more
              </button>
            </Link>

            <div className="border border-neutral-700 my-5" />

            <div className="text-neutral-400">
              <h1 className="font-RubikMedium text-neutral-200">
                Alpha Socials
              </h1>
              <div className="flex items-center gap-x-3  hover:bg-neutral-800  p-2 rounded-md ">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <FaTwitter className="text-lg" />
                </div>
                <h3 className="text-xs ">Twitter.com</h3>
              </div>
              <div className="flex items-center gap-x-3  hover:bg-neutral-800  p-2 rounded-md">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <SiTelegram className="text-lg" />
                </div>
                <h3 className="text-xs ">Telegram</h3>
              </div>
              <div className="flex items-center gap-x-3  hover:bg-neutral-800  p-2 rounded-md">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <SiReddit className="text-lg" />
                </div>
                <h3 className="text-xs ">Reddit.com</h3>
              </div>
              <div className="flex items-center gap-x-3  hover:bg-neutral-800  p-2 rounded-md">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <SiDiscord className="text-lg" />
                </div>
                <h3 className="text-xs ">Discord.com</h3>
              </div>

              <div className="border border-neutral-700 my-5" />

              <div className="flex items-center justify-center gap-x-2">
                <TestimonialTooltip />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1C1C1C] min-w-min rounded-2xl p-4 border border-neutral-800 mt-3 text-neutral-50">
          <Image
            width={1000}
            height={1000}
            className="h-32 w-56 object-cover rounded-lg"
            src="/banner2.webp"
            alt=""
          />
          <p className="my-3 font-RubikMedium text-sm">Promote your memes</p>
          <Link href="mailto:doanthekhiem@gmail.com">
            <button className="bg-[#696969] h-7 p-1 rounded-md text-xs w-full font-RubikMedium ">
              Contact us
            </button>
          </Link>
        </div>
        <div className="border border-neutral-700 my-5" />
        <div className="bg-[#1C1C1C] min-w-min rounded-2xl p-4 border border-neutral-800 text-neutral-50">
          <p className="text-sm text-neutral-50">Powered by:</p>
          <div className="flex text-sm gap-2">
            <Link href={"https://www.coingecko.com/"}>CoinGecko</Link> |{" "}
            <Link href={"https://newsapi.org/"}>NewsAPI</Link> |{" "}
            <Link href={"https://blackreport.tech/"}>BlackReport</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default page;
