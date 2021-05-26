export default function urlMaker(table: string, verb: string): string {
  return `http://localhost:3000/${table}/${verb}`
}
