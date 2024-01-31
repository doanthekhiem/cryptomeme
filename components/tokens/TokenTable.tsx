"use client"
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { formatNumber } from "../providers/constant";
const TokenTable = (data: any) => {
    const dataResult: any[] = data?.data?.filter(el => el?.market_cap_rank)
    const router = useRouter()
    return <div>
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.3, type: "spring", stiffness: 200 },
            }}
            className="w-full lg:w-fit text-neutral-300"
        >
            <div className=" md:w-fit w-full p-2 border border-neutral-800   rounded-2xl h-full bg-[#1C1C1C]  ">
                <table className="w-full table-coins">
                    <tbody>
                        <tr>
                            <th align="center" className="hidden md:table-cell">#</th>
                            <th align="left">Coin</th>
                            <th align="left" className="hidden md:table-cell">Symbol</th>
                            <th align="right">Price</th>
                            <th align="center">24h</th>
                            <th align="right" className="hidden md:table-cell">Volume</th>
                            <th align="right">Mkt Cap</th>
                        </tr>
                        {dataResult?.map(item => (
                            <tr onClick={() => {
                                router.push(`/tokens/${item?.id}`)
                            }} key={item?.id} className="hover:bg-neutral-800 cursor-pointer">
                                <td align="center" className="hidden md:table-cell">{item?.market_cap_rank}</td>
                                <td>
                                    <div className="flex gap-1 items-center">
                                        <Image
                                            width={1000}
                                            height={1000}
                                            className="h-5 w-5 object-cover rounded-lg"
                                            src={item?.image || ""}
                                            alt=""
                                        /> <span className="hidden sm:inline line-clamp-1 max-w-20">{item?.name}</span>
                                        <span className="inline sm:hidden line-clamp-1 max-w-10">{item?.symbol}</span>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell"><span className="line-clamp-1 max-w-20">{item?.symbol}</span></td>
                                <td align="right">
                                    <span>{formatNumber(item?.current_price, "token_price")}</span>
                                </td>
                                <td align="center">
                                    <span className={`${item?.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"} `}>{(item?.price_change_percentage_24h)?.toFixed(2)}%</span>
                                </td>
                                <td align="right" className="hidden md:table-cell">${formatNumber(item?.total_volume)}</td>
                                <td align="right">${formatNumber(item?.market_cap)}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </motion.div >
    </div >
}

export default TokenTable