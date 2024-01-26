"use client";
import React, { useState } from "react";
import {
  PiBookOpenTextLight,
  PiGoogleLogoThin,
  PiTwitterLogoLight,
  PiMagicWandThin,
  PiShapesThin,
  PiHouseLight,
} from "react-icons/pi";
import { SiAdobe } from "react-icons/si";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

function Leftpage() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const controls = useAnimation();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidEmail(email)) {
      setEmail("");
    } else {
      controls.start({
        x: 0,
        transition: {
          type: "spring",
          velocity: "600",
          stiffness: "5000",
          damping: 15,
        },
      });
    }
  };

  return (
    <div>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.3, type: "spring", stiffness: 200 },
        }}
        className=" hidden md:block bg-[#1C1C1C] w-full md:w-80  h-fit sticky top-5 "
      >
        <div className=" md:w-80 w-full p-3 border border-neutral-800   rounded-2xl h-full bg-[#1C1C1C]  ">
          <div className="flex">
            <div className="w-full relative">
              <Image
                width={1000}
                height={1000}
                className="w-28 h-28 rounded-full object-cover"
                src="/logo.jpg"
                alt=""
              />
              <div
                onClick={() => setOpen(!open)}
                className="bg-lime-400 w-3 h-3 cursor-pointer rounded-full absolute top-20 right-28 animate-pulse"
              />
              <h1 className="font-RubikExtraBold text-xl   text-neutral-300 mt-3">
                CryptoMEME.org
              </h1>
              <p className="text-sm font-RubikMedium whitespace-nowrap text-neutral-300 mt-2">
                $20 Billion Market Capitalization 💹
              </p>

              <p className="text-sm font-RubikMedium whitespace-nowrap text-neutral-300 mt-1">
                $762 Million 24h Trading Volume📈
              </p>

              <div className="flex w-full   ">
                <div className="flex gap-x-1  text-xs my-4">
                  <p className="bg-[#282828] text-neutral-300 rounded-md whitespace-nowrap px-2 h-5 flex items-center justify-center text-[12px] font-RubikBold">
                    🔥 Dogwifhat
                  </p>
                  <p className="bg-[#282828] text-neutral-300 rounded-md whitespace-nowrap px-2 h-5 flex items-center justify-center text-[12px] font-RubikBold">
                    🔥 Bonk
                  </p>
                  <p className=" bg-[#282828] text-neutral-300 rounded-md whitespace-nowrap px-2 h-5 flex items-center justify-center text-[12px] font-RubikBold shrink-0 ">
                    🔥 Myro
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-x-1 w-full h-fit">
              <Link href={"/"}>
                <div className="bg-neutral-700/50 h-7 w-7 rounded-full flex items-center justify-center">
                  <PiHouseLight className="text-neutral-100" />
                </div>
              </Link>

              <div className="bg-neutral-700/50 h-7 w-7 rounded-full flex items-center justify-center">
                <PiBookOpenTextLight className="text-neutral-100" />
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#282828] p-1  rounded-md md:flex items-center  justify-between h-9 w-full hidden "
          >
            <input
              value={email}
              onChange={handleChange}
              className=" w-36 focus:outline-none bg-transparent text-neutral-400 text-xs placeholder:text-neutral-600 h-full pl-2 placeholder:text-xs placeholder:font-RubikMedium"
              placeholder="name@email.com"
              type="text"
            />
            <motion.button
              animate={controls}
              className="bg-[#696969] h-full p-1 rounded-md text-xs w-20 font-RubikMedium text-neutral-50"
            >
              Subscribe
            </motion.button>
          </form>

          <div className="w-full mt-5 text-neutral-300">
            <h2 className="font-RubikBold my-4">
              Memes for the community! 🚀🚀🚀
            </h2>
            <p className="text-[12px]  font-RubikRegular my-3">
              Meme coins derive their relevance from memes, <br /> thriving on
              hype and picking up momentum as the community grows.
            </p>

            <div className="mt-6 flex justify-between text-sm">
              <div className="flex items-center gap-x-1">
                <PiShapesThin />
                <span className="text-xs font-RubikRegular">
                  1.24% total market cap
                </span>
              </div>
              <div className="flex items-center gap-x-1">
                <PiMagicWandThin />
                <span className="text-xs font-RubikRegular">340 tokens</span>
              </div>
            </div>

            <div className="border border-[#282828] text-neutral-300 my-6" />

            <div className="my-4 ">
              <h1 className="font-RubikRegular"> Largest Gainers</h1>
              <div className="mt-7 flex justify-between">
                <div className="flex gap-x-3">
                  <PiGoogleLogoThin className="text-xl" />
                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">OmniCat</h3>
                    <p className="text-[12px]">$0.0007319</p>
                  </div>
                </div>
                <small className="text-[12px] text-neutral-300">44.9%</small>
              </div>
              <div className="mt-7 flex justify-between">
                <div className="flex gap-x-3">
                  <PiGoogleLogoThin className="text-xl" />
                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">OmniCat</h3>
                    <p className="text-[12px]">$0.0007319</p>
                  </div>
                </div>
                <small className="text-[12px] text-neutral-300">44.9%</small>
              </div>
              <div className="mt-7 flex justify-between">
                <div className="flex gap-x-3">
                  <PiGoogleLogoThin className="text-xl" />
                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">OmniCat</h3>
                    <p className="text-[12px]">$0.0007319</p>
                  </div>
                </div>
                <small className="text-[12px] text-neutral-300">44.9%</small>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Leftpage;
