export default function formatDate(date: Date, separator: string) {
  return new Date(date)
    .toISOString()
    .replace("-", separator)
    .split("T")[0]
    .replace("-", separator)
    .split(separator)
    .reverse()
    .join(separator)
}