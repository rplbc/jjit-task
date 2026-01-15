export default async function Home() {
  let data = {};

  try {
    const res = await fetch("http://localhost:5189/");
    data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    data = { error: "Failed to fetch data" };
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
