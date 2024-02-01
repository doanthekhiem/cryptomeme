"use client"
import { useState } from "react";

import {
    PiMagicWandThin,
    PiShapesThin,
    PiTrendDownBold,
    PiTrendUpBold
} from "react-icons/pi";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "../constant";
const LeftSideBar = ({ categoriesData, memeTokenData }: any) => {
    const dataResult: any = categoriesData?.find(el => el.id == "meme-token")
    const sortedData = memeTokenData?.sort((a, b) =>
        (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
    );
    const dataGainers = sortedData?.slice(0, 3);
    console.log(dataGainers);

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
    return <div>
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
                            className="h-32 w-full object-cover rounded-lg"
                            src="/banner1.webp"
                            alt=""
                        />
                        <h1 className="font-RubikExtraBold text-3xl   text-neutral-300 mt-3">
                            CryptoMEME.org
                        </h1>
                        <div className="border border-[#282828] text-neutral-300 my-6" />

                        <div className="flex my-2">
                            <div className="text-sm px-2 flex flex-col border-r border-r-neutral-300 flex-1 items-center gap-1 font-RubikMedium whitespace-nowrap text-neutral-300">
                                <div className="flex gap-1">${formatNumber(dataResult?.market_cap || 0, "Billion")} <span className={`flex items-center gap-1 ${dataResult?.market_cap_change_24h < 0 ? "text-red-500" : "text-green-500"} `}>{formatNumber((dataResult?.market_cap_change_24h), "Percent")} {dataResult?.market_cap_change_24h < 0 ? (<PiTrendDownBold />) : (<PiTrendUpBold />)} </span></div>
                                <span className="text-xs font-RubikRegular">Market Cap</span>
                            </div>
                            <div className="text-sm ml-3 flex-1 flex flex-col items-center font-RubikMedium whitespace-nowrap text-neutral-300">
                                ${formatNumber(dataResult?.volume_24h || 0, "Million")} <br /> <span className="text-xs font-RubikRegular">Trading Volume</span>
                            </div>
                        </div>
                        <div className="flex w-full justify-center">
                            <div className="flex gap-x-1  text-xs my-4">
                                {dataGainers?.map(el => (
                                    <Link key={el.id} href={`/tokens/${el?.id}`}>
                                        <p className="bg-[#282828] text-neutral-300 rounded-md whitespace-nowrap px-2 h-5 flex items-center justify-center text-[12px] font-RubikBold">
                                            🔥 <span className="line-clamp-1 max-w-20">{el?.name}</span>
                                        </p>
                                    </Link>
                                ))}
                            </div>
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
                        <h1 className="font-RubikRegular mb-5"> Largest Gainers</h1>
                        {dataGainers?.map(el => (
                            <Link key={el.id} href={`/tokens/${el?.id}`}>
                                <div className="py-2 px-2 rounded-md hover:bg-neutral-800 flex items-center justify-between">
                                    <div className="flex gap-x-3">
                                        <Image
                                            width={1000}
                                            height={1000}
                                            className="h-5 w-5 object-cover rounded-lg"
                                            src={el?.image || ""}
                                            alt=""
                                        />
                                        <div className="-mt-1">
                                            <h3 className="text-sm font-RubikMedium">{el?.name} </h3>
                                            <p className="text-[12px]">${formatNumber(el?.current_price, "token_price")}</p>
                                        </div>
                                    </div>
                                    <small className="text-[12px] text-green-500">{(el?.price_change_percentage_24h)?.toFixed(2)}%</small>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
}

export default LeftSideBar