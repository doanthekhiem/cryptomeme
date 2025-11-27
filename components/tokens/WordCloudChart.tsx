"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import cloud from "d3-cloud";
import * as d3 from "d3";

interface TokenData {
  id: string;
  name: string;
  price_change_percentage_24h: number;
}

interface WordCloudChartProps {
  data: TokenData[];
}

interface WordData {
  text: string;
  size: number;
  value: number;
  index: number;
  coinId: string;
  x?: number;
  y?: number;
  rotate?: number;
}

const WordCloudChart = ({ data }: WordCloudChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const draw = useCallback((words: WordData[]) => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.width / 2},${dimensions.height / 2})`
      );

    // Modern gradient colors
    const colors = [
      "#06b6d4", // cyan-500
      "#8b5cf6", // violet-500
      "#ec4899", // pink-500
      "#10b981", // emerald-500
      "#f59e0b", // amber-500
      "#6366f1", // indigo-500
      "#14b8a6", // teal-500
      "#f43f5e", // rose-500
      "#84cc16", // lime-500
      "#a855f7", // purple-500
    ];

    const colorScale = d3.scaleOrdinal(colors);

    svg
      .selectAll("text")
      .data(words.sort((a, b) => a.index - b.index))
      .enter()
      .append("text")
      .style("font-size", (d) => `${d.size}px`)
      .style("font-family", "RubikBold, Arial, sans-serif")
      .style("font-weight", "bold")
      .style("fill", (d, i) => colorScale(i.toString()))
      .style("opacity", 0.85)
      .style("cursor", "pointer")
      .style("transition", "all 0.2s ease")
      .attr("text-anchor", "middle")
      .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text((d) => d.text)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .style("opacity", 1)
          .style("font-size", `${d.size * 1.15}px`)
          .style("filter", "drop-shadow(0 0 8px currentColor)");
        setHoveredWord(d.coinId);
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .style("opacity", 0.85)
          .style("font-size", `${d.size}px`)
          .style("filter", "none");
        setHoveredWord(null);
      })
      .on("click", (event, d) => {
        window.location.href = `/tokens/${d.coinId}`;
      });
  }, [dimensions]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0 && data.length > 0) {
      const maxSize = Math.min(dimensions.width, dimensions.height) * 0.08;
      const minSize = Math.max(12, maxSize * 0.25);
      
      const sizeScale = d3
        .scaleLinear()
        .domain([0, Math.min(data.length - 1, 100)])
        .range([maxSize, minSize]);

      const layout = cloud<WordData>()
        .size([dimensions.width, dimensions.height])
        .words(
          data.slice(0, 100).map((d, index) => ({
            text: d.name,
            size: sizeScale(index),
            value: Math.abs(d.price_change_percentage_24h),
            index: index,
            coinId: d.id,
          }))
        )
        .padding(8)
        .rotate(() => (Math.random() > 0.7 ? 90 : 0))
        .font("RubikBold, Arial")
        .fontSize((d) => d.size || 12)
        .spiral("archimedean")
        .on("end", draw);

      layout.start();
    }
  }, [data, dimensions, draw]);

  // Find hovered token data
  const hoveredToken = hoveredWord ? data.find((t) => t.id === hoveredWord) : null;

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
      
      {/* Tooltip */}
      {hoveredToken && (
        <div className="absolute bottom-4 left-4 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700 rounded-xl px-4 py-3 shadow-xl">
          <p className="text-white font-RubikMedium text-sm">{hoveredToken.name}</p>
          <p className={`text-sm ${hoveredToken.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {hoveredToken.price_change_percentage_24h >= 0 ? '+' : ''}
            {hoveredToken.price_change_percentage_24h.toFixed(2)}% (24h)
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 right-4 text-neutral-500 text-xs bg-neutral-900/50 backdrop-blur-sm px-3 py-2 rounded-lg">
        Click a token to view details
      </div>
    </div>
  );
};

export default WordCloudChart;
