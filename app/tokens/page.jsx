import TokensPageClient from "../../components/tokens/TokensPageClient";

async function getData() {
  const params = new URLSearchParams({
    vs_currency: `usd`,
    category: "meme-token",
    order: "market_cap_desc",
    per_page: "500",
    page: "1",
    sparkline: "true",
    locale: "en",
  });
  
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`,
    { next: { revalidate: 3600 } } // Revalidate every minute for fresher data
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const metadata = {
  title: "Meme Token Explorer | CryptoMeme",
  description: "Track and analyze the top meme tokens by market cap, volume, and price performance",
};

export default async function TokensPage() {
  let data;
  try {
    data = await getData();
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-RubikMedium mb-2">Failed to load data</h2>
          <p className="text-neutral-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return <TokensPageClient data={data} />;
}
