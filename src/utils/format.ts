export function formatPrice(price: number, type: string): string {
  if (type === "rent") {
    return `$${price.toLocaleString()}/mo`;
  }
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(1)}M`;
  }
  return `$${(price / 1_000).toFixed(0)}K`;
}
