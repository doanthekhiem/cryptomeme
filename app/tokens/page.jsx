import LeftSideBar from "@/components/providers/side-bar/LeftSideBar";
import TokenTable from "@/components/tokens/TokenTable";

async function getData() {
  const params = new URLSearchParams({
    vs_currency: `usd`,
    category: "meme-token",
    order: "market_cap_desc",
    per_page: "500",
    page: "1",
    sparkline: true,
    locale: "en",
  });
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function TokensPage() {
  let data;
  try {
    data = await getData();
  } catch (error) {
    // Handle the error appropriately, e.g., log it or display an error message
    console.error("Error fetching data:", error);
    // Optionally, render an error component or message here
    return <div>Error loading data</div>;
  }

  // Render your page with the fetched data
  return (
    <>
      <TokenTable data={data} />
    </>
  );
}
