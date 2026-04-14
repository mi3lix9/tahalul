import type { VerifiedActionInput } from '@/types/domain';
import type { ActionType, VerificationMethod } from '@/types/entities';

export function normalizeAction(
  type: ActionType,
  method: VerificationMethod,
  extras?: { photoUri?: string; qrCode?: string; locationId?: string },
): VerifiedActionInput {
  return {
    type,
    verificationMethod: method,
    photoUri: extras?.photoUri,
    qrCode: extras?.qrCode,
    locationId: extras?.locationId,
  };
}
