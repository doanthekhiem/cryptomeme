type FormatType = "Billion" | "Million" | "Percent";

export function formatNumber(value: number, format: FormatType): string {
    let formattedNumber: string;

    switch (format) {
        case "Billion":
            formattedNumber = (value / 1000000000).toFixed(1) + " Billion";
            break;
        case "Million":
            formattedNumber = (value / 1000000).toFixed(1) + " Million";
            break;
        case "Percent":
            formattedNumber = (value).toFixed(1) + "%";
            break;
        default:
            formattedNumber = value.toString();
            break;
    }

    return formattedNumber;
}