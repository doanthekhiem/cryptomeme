import Homepage from "../HomePage/page";

async function getData() {
  const params = new URLSearchParams({
    q: `("MEME coin" OR "meme coin" OR "meme token")`,
    sortBy: "publishedAt",
    apiKey: "769855619d27437f93cd0fda2e5fb9ad",
    language: "en",
  });
  const res = await fetch(
    `https://newsapi.org/v2/everything?${params.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
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
    <main>
      <Homepage data={data} />
    </main>
  );
}
