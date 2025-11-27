"use client";
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
}

interface TokenCardProps {
  token: TokenData;
  index: number;
}

const TokenCard = ({ token, index }: TokenCardProps) => {
  const router = useRouter();
  const isUp = token.price_change_percentage_24h >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={() => router.push(`/tokens/${token.id}`)}
      className="group relative cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-[#1a1a1a] border border-neutral-800/50 rounded-2xl p-5 hover:border-neutral-700/80 transition-all duration-300 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-8 -translate-y-8" />
        </div>

        {/* Rank Badge */}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-medium text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded-md">
            #{token.market_cap_rank}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full blur-md ${isUp ? 'bg-emerald-500/20' : 'bg-red-500/20'}`} />
            <Image
              src={token.image}
              alt={token.name}
              width={48}
              height={48}
              className="relative w-12 h-12 rounded-full object-cover ring-2 ring-neutral-700/50"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-RubikMedium text-white text-base truncate">{token.name}</h3>
            <p className="text-neutral-400 text-sm uppercase">{token.symbol}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-RubikBold text-white mb-1">
            ${formatNumber(token.current_price, "token_price")}
          </p>
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1 text-sm font-medium ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              <svg 
                className={`w-3 h-3 ${!isUp && 'rotate-180'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {Math.abs(token.price_change_percentage_24h).toFixed(2)}%
            </span>
            <span className="text-neutral-500 text-xs">24h</span>
          </div>
        </div>

        {/* Sparkline */}
        {token.sparkline_in_7d?.price && (
          <div className="mb-4 bg-neutral-900/50 rounded-xl p-3">
            <SparklineChart 
              data={token.sparkline_in_7d.price} 
              width={200} 
              height={50}
            />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-900/30 rounded-lg p-2.5">
            <p className="text-neutral-500 text-xs mb-0.5">Market Cap</p>
            <p className="text-neutral-200 text-sm font-RubikMedium">
              ${formatNumber(token.market_cap)}
            </p>
          </div>
          <div className="bg-neutral-900/30 rounded-lg p-2.5">
            <p className="text-neutral-500 text-xs mb-0.5">Volume 24h</p>
            <p className="text-neutral-200 text-sm font-RubikMedium">
              ${formatNumber(token.total_volume)}
            </p>
          </div>
        </div>

        {/* ATH Info */}
        <div className="mt-3 pt-3 border-t border-neutral-800/50">
          <div className="flex justify-between items-center">
            <span className="text-neutral-500 text-xs">ATH</span>
            <div className="text-right">
              <span className="text-neutral-300 text-xs font-RubikMedium">
                ${formatNumber(token.ath, "token_price")}
              </span>
              <span className="text-red-400/70 text-xs ml-2">
                {token.ath_change_percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TokenCard;

