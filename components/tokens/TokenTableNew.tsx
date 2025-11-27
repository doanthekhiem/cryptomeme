"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatNumber } from "../providers/constant";
import SparklineChart from "./SparklineChart";

interface TokenData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
  ath: number;
  ath_change_percentage: number;
  circulating_supply: number;
  max_supply: number | null;
}

interface TokenTableNewProps {
  data: TokenData[];
}

const TokenTableNew = ({ data }: TokenTableNewProps) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const router = useRouter();

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn as keyof TokenData];
      const bValue = b[sortColumn as keyof TokenData];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ column }: { column: string }) => (
    <svg
      className={`w-3 h-3 ml-1 transition-transform ${
        sortColumn === column
          ? "text-cyan-400"
          : "text-neutral-500"
      } ${sortColumn === column && sortDirection === "asc" ? "rotate-180" : ""}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-[#1a1a1a] border border-neutral-800/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800/50">
                <th className="text-left text-neutral-400 text-xs font-medium uppercase tracking-wider py-4 px-4 w-12">
                  #
                </th>
                <th className="text-left text-neutral-400 text-xs font-medium uppercase tracking-wider py-4 px-4 min-w-[180px]">
                  Token
                </th>
                <th
                  onClick={() => handleSort("current_price")}
                  className="text-right text-neutral-400 text-xs font-medium uppercase tracking-wider py-4 px-4 cursor-pointer hover:text-neutral-200 transition-colors"
                >
                  <div className="flex items-center justify-end">
                    Price
                    <SortIcon column="current_price" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("price_change_percentage_24h")}
                  className="text-right text-neutral-400 text-xs font-medium uppercase tracking-wider py-4 px-4 cursor-pointer hover:text-neutral-200 transition-colors"
                >
                  <div className="flex items-center justify-end">
                    24h %
                    <SortIcon column="price_change_percentage_24h" />
                  </div>
                </th>
                <th className="text-center text-neutral-400 text-xs font-medium uppercase tracking-wider py-4 px-4 hidden lg:table-cell min-w-[140px]">
                  7D Chart
                </th>
                <th
                  onClick={() => handleSort("total_volume")}
                  className="text-right text-neutral-400 text-xs font-medium uppercase tracking-wider py-4 px-4 cursor-pointer hover:text-neutral-200 transition-colors hidden md:table-cell"
                >
                  <div className="flex items-center justify-end">
                    Volume
                    <SortIcon column="total_volume" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("market_cap")}
                  className="text-right text-neutral-400 text-xs font-medium uppercase tracking-wider py-4 px-4 cursor-pointer hover:text-neutral-200 transition-colors"
                >
                  <div className="flex items-center justify-end">
                    Market Cap
                    <SortIcon column="market_cap" />
                  </div>
                </th>
                <th className="text-right text-neutral-400 text-xs font-medium uppercase tracking-wider py-4 px-4 hidden xl:table-cell">
                  ATH
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((token, index) => {
                const isUp = token.price_change_percentage_24h >= 0;
                return (
                  <motion.tr
                    key={token.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.01 }}
                    onClick={() => router.push(`/tokens/${token.id}`)}
                    className="border-b border-neutral-800/30 hover:bg-neutral-800/30 cursor-pointer transition-colors group"
                  >
                    {/* Rank */}
                    <td className="py-4 px-4">
                      <span className="text-neutral-500 text-sm">{token.market_cap_rank}</span>
                    </td>

                    {/* Token Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src={token.image}
                            alt={token.name}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-neutral-800 group-hover:ring-neutral-700 transition-all"
                          />
                        </div>
                        <div>
                          <p className="text-white font-RubikMedium text-sm group-hover:text-cyan-400 transition-colors">
                            {token.name}
                          </p>
                          <p className="text-neutral-500 text-xs uppercase">{token.symbol}</p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 text-right">
                      <span className="text-white font-RubikMedium">
                        ${formatNumber(token.current_price, "token_price")}
                      </span>
                    </td>

                    {/* 24h Change */}
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${
                          isUp
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-red-400 bg-red-500/10"
                        }`}
                      >
                        <svg
                          className={`w-3 h-3 ${!isUp && "rotate-180"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {Math.abs(token.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </td>

                    {/* Sparkline */}
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <div className="flex justify-center">
                        {token.sparkline_in_7d?.price && (
                          <SparklineChart
                            data={token.sparkline_in_7d.price}
                            width={120}
                            height={35}
                            showGradient={false}
                          />
                        )}
                      </div>
                    </td>

                    {/* Volume */}
                    <td className="py-4 px-4 text-right hidden md:table-cell">
                      <span className="text-neutral-300 text-sm">
                        ${formatNumber(token.total_volume)}
                      </span>
                    </td>

                    {/* Market Cap */}
                    <td className="py-4 px-4 text-right">
                      <span className="text-neutral-300 text-sm">
                        ${formatNumber(token.market_cap)}
                      </span>
                    </td>

                    {/* ATH */}
                    <td className="py-4 px-4 text-right hidden xl:table-cell">
                      <div>
                        <span className="text-neutral-300 text-sm block">
                          ${formatNumber(token.ath, "token_price")}
                        </span>
                        <span className="text-red-400/70 text-xs">
                          {token.ath_change_percentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default TokenTableNew;

