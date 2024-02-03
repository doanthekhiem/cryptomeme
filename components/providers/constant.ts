import { IChartColor } from "./tableInterface";

type FormatType = "Billion" | "Million" | "Percent" | "token_price";

export function formatNumber(value: number, format?: FormatType): string {
    // Định nghĩa các hằng số cho các giá trị limit.
    const billion = 1e9; // 1,000,000,000
    const million = 1e6; // 1,000,000

    if (!format) {
        // Nếu giá trị lớn hơn hoặc bằng 1 tỷ, format theo dạng Billion.
        if (value >= billion) {
            format = "Billion";
        } else if (value >= million) {
            // Nếu giá trị lớn hơn hoặc bằng 1 triệu, format theo dạng Million.
            format = "Million";
        }
        // Không cần else ở đây vì nếu không đáp ứng 2 điều kiện trên, format sẽ là undefined và số sẽ được format theo dạng mặc định.
    }

    // Tiến hành format số theo định dạng đã xác định.
    switch (format) {
        case "Billion":
            return (value / billion).toLocaleString("en-US", { maximumFractionDigits: 1 }) + " B";
        case "Million":
            return (value / million).toLocaleString("en-US", { maximumFractionDigits: 1 }) + " M";
        case "Percent":
            return value?.toFixed(2) + "%";
        case "token_price":
            return value > 0.01 ? value?.toFixed(2) : value > 0.000001 ? value?.toFixed(7) : value?.toFixed(9);
        default:
            return value.toLocaleString("en-US");
    }
}
export const CHART_COLOR: IChartColor[] = [
    {
        id: "colorUp",
        color: "#00c087",
        bg: "#82ca9d",
    },
    {
        id: "colorDown",
        color: "#f63d3d",
        bg: "#f63d3d",
    },
];