import LeftSideBar from "@/components/providers/side-bar/LeftSideBar";

async function getCategoriesData() {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/categories`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories data");
  }

  return res.json();
}

async function getMemeTokenData() {
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
    throw new Error("Failed to fetch meme token data");
  }

  return res.json();
}

export default async function Leftpage() {
  let categoriesData, memeTokenData;
  try {
    categoriesData = await getCategoriesData();
    memeTokenData = await getMemeTokenData();
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }

  // Render your page with the fetched data
  return (
    <>
      <LeftSideBar
        categoriesData={categoriesData}
        memeTokenData={memeTokenData}
      />
    </>
  );
}
