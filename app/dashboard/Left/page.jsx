import LeftSideBar from "@/components/providers/side-bar/LeftSideBar";

async function getData() {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/categories`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Leftpage() {
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
      <LeftSideBar data={data} />
    </>
  );
}
