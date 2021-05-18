export default async function getFakeData(): Promise<Response> {
  const result = await fetch("/fakeData.json")
  return new Promise((resolve) => {
    setTimeout((): void => {
      resolve(result.json())
    }, 3000);
  });
}
