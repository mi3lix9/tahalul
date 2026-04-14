import { describe, expect, it } from 'vitest';

import { parseQRCode } from '@/features/actions/domain/qr-parser';

describe('parseQRCode', () => {
  it('parses a valid eco city QR code', () => {
    expect(parseQRCode('ECOCITY:BIN:Riyadh:123')).toEqual({
      valid: true,
      city: 'Riyadh',
      binId: '123',
      locationId: 'bin_riyadh_123',
    });
  });

  it('returns invalid for unsupported formats', () => {
    expect(parseQRCode('hello-world')).toEqual({ valid: false });
    expect(parseQRCode('ECOCITY:USER:Riyadh:123')).toEqual({ valid: false });
  });

  it('rejects edge cases with missing segments or extra separators', () => {
    expect(parseQRCode('ECOCITY:BIN:Riyadh')).toEqual({ valid: false });
    expect(parseQRCode('ECOCITY:BIN::123')).toEqual({ valid: false });
    expect(parseQRCode('ECOCITY:BIN:Riyadh:123:extra')).toEqual({ valid: false });
  });
});
