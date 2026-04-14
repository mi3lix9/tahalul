export interface QRParseResult {
  valid: boolean;
  city?: string;
  binId?: string;
  locationId?: string;
}

export function parseQRCode(data: string): QRParseResult {
  const pattern = /^ECOCITY:BIN:([^:]+):([^:]+)$/;
  const match = data.match(pattern);
  if (!match) return { valid: false };

  return {
    valid: true,
    city: match[1],
    binId: match[2],
    locationId: `bin_${match[1]}_${match[2]}`.toLowerCase(),
  };
}
