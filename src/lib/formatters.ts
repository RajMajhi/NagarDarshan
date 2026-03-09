export function formatCurrency(crores: number): string {
  if (crores >= 100) return `₹${Math.round(crores)} Cr`;
  if (crores >= 1) return `₹${crores % 1 === 0 ? crores : crores.toFixed(1)} Cr`;
  return `₹${(crores * 100).toFixed(0)} L`;
}

export function formatNumber(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)} Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)} L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString('en-IN');
}

export function formatNumberFull(num: number): string {
  return num.toLocaleString('en-IN');
}
