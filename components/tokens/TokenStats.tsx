"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { formatNumber } from "../providers/constant";

interface TokenData {
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

interface TokenStatsProps {
  data: TokenData[];
}

const TokenStats = ({ data }: TokenStatsProps) => {
  const stats = useMemo(() => {
    if (!data || data.length === 0) return null;

    const totalMarketCap = data.reduce((sum, token) => sum + (token.market_cap || 0), 0);
    const totalVolume = data.reduce((sum, token) => sum + (token.total_volume || 0), 0);
    const gainers = data.filter((t) => t.price_change_percentage_24h > 0).length;
    const losers = data.filter((t) => t.price_change_percentage_24h < 0).length;
    const avgChange = data.reduce((sum, t) => sum + (t.price_change_percentage_24h || 0), 0) / data.length;

    return {
      totalMarketCap,
      totalVolume,
      totalTokens: data.length,
      gainers,
      losers,
      avgChange,
    };
  }, [data]);

  if (!stats) return null;

  const statItems = [
    {
      label: "Total Market Cap",
      value: `$${formatNumber(stats.totalMarketCap)}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "24h Volume",
      value: `$${formatNumber(stats.totalVolume)}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Meme Tokens",
      value: stats.totalTokens.toString(),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Gainers / Losers",
      value: `${stats.gainers} / ${stats.losers}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: "from-emerald-500 to-teal-500",
      extra: (
        <span className={`text-xs ml-2 ${stats.avgChange >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          ({stats.avgChange >= 0 ? "+" : ""}{stats.avgChange.toFixed(2)}% avg)
        </span>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative group"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
          <div className="relative bg-[#1a1a1a] border border-neutral-800/50 rounded-2xl p-5 hover:border-neutral-700/80 transition-all">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} mb-3`}>
              <span className="text-white">{item.icon}</span>
            </div>
            <p className="text-neutral-400 text-sm mb-1">{item.label}</p>
            <div className="flex items-center">
              <p className="text-white font-RubikBold text-xl">{item.value}</p>
              {item.extra}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TokenStats;

