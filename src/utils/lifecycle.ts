export const transitions: Record<string, string[]> = {
  CREATED: ['APPROVED', 'REVOKED'],
  APPROVED: ['SENT'],
  SENT: ['SIGNED', 'REVOKED'],
  SIGNED: ['LOCKED'],
  LOCKED: [],
  REVOKED: [],
};

export const canTransition = (from: string, to: string): boolean => {
  return transitions[from]?.includes(to);
};
