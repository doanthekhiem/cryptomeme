type FormatType = "Billion" | "Million" | "Percent" | "token_price";

export function formatNumber(value: number, format?: FormatType): string {
    let formattedNumber: string;

    switch (format) {
        case "Billion":
            formattedNumber = (value / 1000000000).toFixed(1) + " Billion";
            break;
        case "Million":
            formattedNumber = (value / 1000000).toFixed(1) + " Million";
            break;
        case "Percent":
            formattedNumber = value.toFixed(1) + "%";
            break;
        case "token_price":
            formattedNumber = value > 0.01 ? value.toFixed(2) : value.toFixed(6);
            break;
        default:
            formattedNumber = value.toLocaleString("en-US");
            break;
    }

    return formattedNumber;
}
