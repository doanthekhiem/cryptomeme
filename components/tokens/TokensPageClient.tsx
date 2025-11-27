"use client";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TokenStats from "./TokenStats";
import FilterBar from "./FilterBar";
import TokenCard from "./TokenCard";
import TokenTableNew from "./TokenTableNew";
import WordCloudChart from "./WordCloudChart";

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

interface TokensPageClientProps {
  data: TokenData[];
}

const TokensPageClient = ({ data }: TokensPageClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [viewMode, setViewMode] = useState<"grid" | "table" | "cloud">("grid");
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "market_cap_desc":
        result.sort((a, b) => b.market_cap - a.market_cap);
        break;
      case "market_cap_asc":
        result.sort((a, b) => a.market_cap - b.market_cap);
        break;
      case "price_change_desc":
        result.sort(
          (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
        );
        break;
      case "price_change_asc":
        result.sort(
          (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
        );
        break;
      case "volume_desc":
        result.sort((a, b) => b.total_volume - a.total_volume);
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [data, searchQuery, sortBy]);

  const visibleData = useMemo(() => {
    if (viewMode === "cloud") return filteredData;
    return filteredData.slice(0, visibleCount);
  }, [filteredData, visibleCount, viewMode]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 24, filteredData.length));
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setVisibleCount(24);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  const handleViewChange = useCallback((view: "grid" | "table" | "cloud") => {
    setViewMode(view);
    setVisibleCount(24);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-emerald-500/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 text-sm font-medium">Live Data</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-RubikBold text-white mb-3">
              Meme Token{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Explorer
              </span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Track and analyze the top meme tokens by market cap, volume, and price performance
            </p>
          </motion.div>

          {/* Stats */}
          <TokenStats data={data} />

          {/* Filter Bar */}
          <FilterBar
            onSearch={handleSearch}
            onSortChange={handleSortChange}
            onViewChange={handleViewChange}
            currentView={viewMode}
            totalResults={filteredData.length}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AnimatePresence mode="wait">
          {viewMode === "grid" && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {visibleData.map((token, index) => (
                  <TokenCard key={token.id} token={token} index={index} />
                ))}
              </div>

              {/* Load More */}
              {visibleCount < filteredData.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center mt-8"
                >
                  <button
                    onClick={handleLoadMore}
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium px-8 py-3 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    <span className="relative z-10">
                      Load More ({filteredData.length - visibleCount} remaining)
                    </span>
                    <svg
                      className="w-4 h-4 relative z-10 group-hover:translate-y-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {viewMode === "table" && (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TokenTableNew data={visibleData} />

              {/* Load More */}
              {visibleCount < filteredData.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center mt-8"
                >
                  <button
                    onClick={handleLoadMore}
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium px-8 py-3 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    <span className="relative z-10">
                      Load More ({filteredData.length - visibleCount} remaining)
                    </span>
                    <svg
                      className="w-4 h-4 relative z-10 group-hover:translate-y-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {viewMode === "cloud" && (
            <motion.div
              key="cloud"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1a1a1a] border border-neutral-800/50 rounded-2xl overflow-hidden"
              style={{ height: "70vh" }}
            >
              <WordCloudChart data={filteredData} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-20 h-20 bg-neutral-800/50 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-white text-xl font-RubikMedium mb-2">No tokens found</h3>
            <p className="text-neutral-400 text-center max-w-sm">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TokensPageClient;

