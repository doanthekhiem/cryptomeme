import TokenDetail from "@/components/tokens/TokenDetail";
import TokenTable from "@/components/tokens/TokenTable";

async function getData(id) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?sparkline=true&localization=en`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function TokensPage(ref) {
  const { params, searchParams } = ref;
  let data;
  try {
    data = await getData(params?.id);
  } catch (error) {
    // Handle the error appropriately, e.g., log it or display an error message
    console.error("Error fetching data:", error);
    // Optionally, render an error component or message here
    return <div>Error loading data</div>;
  }

  // Render your page with the fetched data
  return (
    <>
      <TokenDetail data={data} />
    </>
  );
}
