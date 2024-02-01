"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { PiTrendDownBold, PiTrendUpBold } from "react-icons/pi";
import { formatNumber } from "../providers/constant";

import ChartComponent from "./ChartComponent";
import RenderLinks from "./RenderLinks";
import TokenExchangeListTable from "./TokenExchangeListTable";
const TokenDetail = (data: any) => {
    const dataResult: any = data?.data;
    const router = useRouter()
    console.log(dataResult?.market_data);

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
            <div className="md:w-fit w-full flex flex-col gap-3 p-3 border border-neutral-800   rounded-2xl h-full bg-[#1C1C1C]  ">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-end w-full">
                        <Image
                            width={1000}
                            height={1000}
                            className="h-10 w-10 object-cover rounded-lg"
                            src={dataResult?.image?.small || ""}
                            alt=""
                        />
                        <h1 className="font-RubikMedium text-2xl ">{dataResult?.name}</h1>
                        <p className="bg-[#282828] text-neutral-300 rounded-md mb-1 whitespace-nowrap px-2 h-6 flex items-center justify-center text-[14px] font-RubikBold">
                            <span className="line-clamp-1 max-w-20">{dataResult?.symbol}</span>
                        </p>
                    </div>
                    {dataResult?.asset_platform_id ? (
                        <div className="flex gap-2 items-center"><span className=" font-RubikMedium underline">{dataResult?.asset_platform_id}</span></div>
                    ) : (<></>)}
                </div>
                <div className="w-full mx-auto">
                    <div className={`font-RubikMedium text-lg ${dataResult?.market_data?.price_change_24h < 0 ? "text-red-500" : "text-green-500"}`}>${formatNumber(dataResult?.market_data?.current_price?.usd, 'token_price')}</div>
                    <ChartComponent updateTime={dataResult?.market_data?.last_updated} data={dataResult?.market_data?.sparkline_7d?.price} />
                    <div className="border border-[#282828] text-neutral-300 my-3" />
                    <div className="font-bold text-lg mb-3">{dataResult?.name} Market Stats</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-[1px] bg-neutral-800 " style={{
                        gridGap: "1px"
                    }}>
                        <div className="bg-[#1C1C1C] p-6 hover:bg-neutral-800">
                            <div className="">Market Cap Rank</div>
                            <div className="font-RubikMedium text-xl">#{dataResult?.market_cap_rank}</div>
                        </div>
                        <div className="bg-[#1C1C1C] p-6 hover:bg-neutral-800">
                            <div className="">Market Cap</div>
                            <div className="font-RubikMedium text-xl">${formatNumber(dataResult?.market_data?.market_cap?.usd)} </div>
                        </div>
                        <div className="bg-[#1C1C1C] p-6 hover:bg-neutral-800">
                            <div className="">Circulating Supply</div>
                            <div className="font-RubikMedium text-xl">{formatNumber(dataResult?.market_data?.circulating_supply)}</div>
                        </div>
                        <div className="bg-[#1C1C1C] p-6 hover:bg-neutral-800">
                            <div className="">Price Change 24h</div>
                            <div className="font-RubikMedium text-xl"><span className={`flex items-center gap-1 ${dataResult?.market_data?.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"} `}>
                                {formatNumber((dataResult?.market_data?.price_change_percentage_24h), "Percent")} {dataResult?.market_data?.price_change_percentage_24h < 0 ? (<PiTrendDownBold />) : (<PiTrendUpBold />)} </span>
                            </div>
                        </div>
                        <div className="bg-[#1C1C1C] p-6 hover:bg-neutral-800">
                            <div className="">24h Volume</div>
                            <div className="font-RubikMedium text-xl">${formatNumber(dataResult?.market_data?.total_volume?.usd)}</div>
                        </div>
                        <div className="bg-[#1C1C1C] p-6 hover:bg-neutral-800">
                            <div className="flex gap-2 justify-between items-center">
                                <div className="">Low:</div>
                                <div className="font-RubikMedium">${formatNumber(dataResult?.market_data?.low_24h?.usd, 'token_price')}</div>
                            </div>
                            <div className="flex justify-between gap-2 items-center">
                                <div className="">High:</div>
                                <div className="font-RubikMedium">${formatNumber(dataResult?.market_data?.high_24h?.usd, 'token_price')}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-[#282828] text-neutral-300 my-3" />
                <div className="w-full mx-auto">
                    <div className="font-bold text-lg mb-3">About {dataResult?.name}</div>
                    <div className="line-clamp-6" dangerouslySetInnerHTML={{ __html: dataResult?.description?.en || '' }}></div>
                    {dataResult?.asset_platform_id ? (
                        <div className="flex gap-2 items-center">Platforms: <span className=" font-RubikMedium underline">{dataResult?.asset_platform_id}</span></div>
                    ) : (<></>)}
                    {dataResult?.categories?.length ? (
                        <div className="flex flex-wrap gap-2 items-center">Categories: {dataResult?.categories?.map(el => (
                            <span key={el} className="">{el} |</span>
                        ))}</div>
                    ) : (<></>)}
                </div>
                <div className="border border-[#282828] text-neutral-300 my-3" />
                <div className="w-full mx-auto">
                    <div className="font-bold text-lg mb-3">Link</div>
                    <RenderLinks data={dataResult?.links} />
                </div>
                <div className="border border-[#282828] text-neutral-300 my-3" />
                <div className="w-full mx-auto">
                    <div className="font-bold text-lg mb-3">Top {dataResult?.name} Markets</div>
                    <TokenExchangeListTable data={dataResult?.tickers} />
                </div>
            </div>
        </motion.div >
    </div >
}

export default TokenDetail