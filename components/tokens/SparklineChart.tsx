"use client";
import { useMemo } from "react";

interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showGradient?: boolean;
}

const SparklineChart = ({
  data,
  width = 120,
  height = 40,
  color,
  showGradient = true,
}: SparklineChartProps) => {
  const { path, gradientPath, isUp, strokeColor } = useMemo(() => {
    if (!data || data.length < 2) return { path: "", gradientPath: "", isUp: true, strokeColor: "#00c087" };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const padding = 2;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - min) / range) * chartHeight;
      return { x, y };
    });

    const pathD = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");

    // Gradient fill path
    const gradientD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

    const priceUp = data[data.length - 1] >= data[0];
    const calculatedColor = color || (priceUp ? "#00c087" : "#f63d3d");

    return {
      path: pathD,
      gradientPath: gradientD,
      isUp: priceUp,
      strokeColor: calculatedColor,
    };
  }, [data, width, height, color]);

  if (!data || data.length < 2) return null;

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showGradient && (
        <path d={gradientPath} fill={`url(#${gradientId})`} />
      )}
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SparklineChart;

