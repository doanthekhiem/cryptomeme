"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
  onViewChange: (view: "grid" | "table" | "cloud") => void;
  currentView: "grid" | "table" | "cloud";
  totalResults: number;
}

const FilterBar = ({
  onSearch,
  onSortChange,
  onViewChange,
  currentView,
  totalResults,
}: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("market_cap_desc");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const sortOptions = [
    { value: "market_cap_desc", label: "Market Cap ↓" },
    { value: "market_cap_asc", label: "Market Cap ↑" },
    { value: "price_change_desc", label: "24h Change ↓" },
    { value: "price_change_asc", label: "24h Change ↑" },
    { value: "volume_desc", label: "Volume ↓" },
    { value: "name_asc", label: "Name A-Z" },
  ];

  const viewOptions = [
    {
      value: "grid" as const,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      label: "Grid",
    },
    {
      value: "table" as const,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      label: "Table",
    },
    {
      value: "cloud" as const,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      label: "Cloud",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="bg-[#1a1a1a] border border-neutral-800/50 rounded-2xl p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl py-2.5 pl-11 pr-4 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-neutral-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <select
              value={activeSort}
              onChange={(e) => {
                setActiveSort(e.target.value);
                onSortChange(e.target.value);
              }}
              className="bg-neutral-900/50 border border-neutral-800 rounded-xl py-2.5 px-4 text-neutral-200 text-sm focus:outline-none focus:border-neutral-600 cursor-pointer appearance-none pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23a3a3a3%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex bg-neutral-900/50 border border-neutral-800 rounded-xl p-1">
              {viewOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onViewChange(option.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    currentView === option.value
                      ? "bg-neutral-700 text-white"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {option.icon}
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-neutral-500 text-sm lg:ml-auto">
            <span className="text-neutral-300 font-medium">{totalResults}</span> tokens found
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;

