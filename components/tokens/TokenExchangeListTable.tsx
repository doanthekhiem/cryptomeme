"use client"
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { formatNumber } from "../providers/constant";
const TokenExchangeListTable = (data: any) => {
    const seenNames = new Set();
    const dataResult = data?.data?.filter(item => {
        return seenNames.has(item?.market?.name) ? false : seenNames.add(item?.market?.name);
    }).slice(0, 20);
    console.log(dataResult);

    const router = useRouter()
    return <div>
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.3, type: "spring", stiffness: 200 },
            }}
            className="w-full text-neutral-300"
        >
            <div className="w-full p-2 border border-neutral-800   rounded-2xl h-full bg-[#1C1C1C]  ">
                <table className="w-full table-coins">
                    <tbody>
                        <tr>
                            <th align="left" >#</th>
                            <th align="center">Pair </th>
                            <th align="right" >Price</th>
                            <th align="right" className="hidden md:table-cell">Volume</th>
                            <th align="right" className="hidden md:table-cell">Last Updated</th>
                            <th align="right"></th>
                        </tr>
                        {dataResult?.map(item => (
                            <tr key={item?.id} className="hover:bg-neutral-800 cursor-pointer">
                                <td align="left">{item?.market?.name}</td>
                                <td align="left" >
                                    <Link href={item?.trade_url || "#"} target="_blank">
                                        <p className="bg-[#282828] text-neutral-300 rounded-md whitespace-nowrap px-2 h-5 flex items-center justify-center text-[12px] font-RubikBold">
                                            {item?.base?.length > 10 ? "Trade" : <>{item?.base}/{item?.target}</>}
                                        </p>
                                    </Link>
                                </td>
                                <td align="right">
                                    <span>{formatNumber(item?.last)}</span>
                                </td>
                                <td align="right" className="hidden md:table-cell">${formatNumber(item?.converted_volume?.usd)}</td>
                                <td align="right" className="hidden md:table-cell">{dayjs(item?.last_fetch_at).format("HH:mm DD/MM")}</td>
                                <td align="right" ><div className={`w-2 h-2 rounded-full bg-${item?.trust_score || "red"}-500`}></div></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </motion.div >
    </div >
}

export default TokenExchangeListTable