import React, { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, TooltipProps, YAxis, XAxis } from "recharts";
import { ChartComponentProps, IChartColor } from "../providers/tableInterface";
import { CHART_COLOR } from "../providers/constant";
import dayjs from "dayjs";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <div>{payload[0].payload.day}</div> {/* Sửa ở đây */}
        <div>{`$${payload[0].value}`}</div>
      </div>
    );
  }

  return null;
};

const ChartComponent: React.FC<ChartComponentProps> = ({ data, updateTime }) => {
  const formattedData = data.map((usdValue, index) => {
    const initTime = dayjs(updateTime).add(-7, 'day')
    const time = dayjs(initTime).add(index, 'hour').format('HH:mm DD/MM');
    return {
      day: time,
      usdValue: usdValue.toFixed(10),
    };
  });

  const [color, setColor] = useState<IChartColor>(CHART_COLOR[0]);

  useEffect(() => {
    if (formattedData.length >= 2) {
      const firstPoint = formattedData[0].usdValue;
      const lastPoint = formattedData[formattedData.length - 1].usdValue;
      setColor(firstPoint < lastPoint ? CHART_COLOR[0] : CHART_COLOR[1]);
    }
  }, [formattedData]);

  return (
    <div className="w-full pb-4 2xl:h-[400px] lg:h-[300px] sm:h-[200px] h-[200px] mb-3">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          <defs>
            <linearGradient id={color?.id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color?.bg} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color?.bg} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={["dataMin", "dataMax", "auto"]} />
          <XAxis dataKey="index" hide />
          <Area type="monotone" dataKey="usdValue" stroke={color?.color} fillOpacity={1} fill={`url(#${color?.id})`} />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-between">
        <p>{dayjs(updateTime).subtract(7, 'day').format('DD/MM')}</p>
        <p>{dayjs(updateTime).format('DD/MM')}</p>
      </div>
    </div>
  );
};

export default ChartComponent;
