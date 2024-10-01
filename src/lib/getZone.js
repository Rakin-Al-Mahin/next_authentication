export default async function getZone() {
  const result = await fetch("http://localhost:5000/api/zone/get-all-zone");

  if (!result.ok) {
    throw new Error("There was an error fetching posts!");
  }

  return result.json();
}
