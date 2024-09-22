"use client";
import { useEffect, useRef, useState } from "react";
import cloud from "d3-cloud";
import * as d3 from "d3";
import styles from "./WordCloudChart.module.css";

const WordCloudChart = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      const maxSize = 50; // Kích thước tối đa cho từ
      const minSize = 10; // Kích thước tối thiểu cho từ
      const sizeScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([maxSize, minSize]);

      const layout = cloud()
        .size([dimensions.width, dimensions.height])
        .words(
          data.map((d, index) => ({
            text: d.name,
            size: sizeScale(index),
            value: Math.abs(d.price_change_percentage_24h),
            index: index
          }))
        )
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font("Arial")
        .fontSize((d) => d.size)
        .spiral("archimedean")
        .on("end", draw);

      layout.start();
    }
  }, [data, dimensions]);

  const draw = (words) => {
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

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .selectAll("text")
      .data(words.sort((a, b) => a.index - b.index))
      .enter()
      .append("text")
      .style("font-size", (d) => `${d.size}px`)
      .style("font-family", "Arial, sans-serif")
      .style("font-weight", "bold")
      .style("fill", (d, i) => color(i.toString()))
      .attr("text-anchor", "middle")
      .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text((d) => d.text)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
  };

  const handleMouseOver = (event, d) => {
    d3.select(event.currentTarget)
      .transition()
      .duration(200)
      .style("font-size", `${d.size * 1.2}px`)
      .style("cursor", "pointer");
  };

  const handleMouseOut = (event, d) => {
    d3.select(event.currentTarget)
      .transition()
      .duration(200)
      .style("font-size", `${d.size}px`);
  };

  return (
    <div className={styles.wordCloudContainer}>
      <svg ref={svgRef} className={styles.wordCloudSvg}></svg>
    </div>
  );
};

export default WordCloudChart;
