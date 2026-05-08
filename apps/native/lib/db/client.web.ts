// expo-sqlite is not supported on web — provide a no-op mock database

const mockDb = {
  getAllAsync: async () => [],
  getFirstAsync: async () => null,
  runAsync: async () => ({ changes: 0, lastInsertRowId: 0 }),
  execAsync: async () => {},
  closeAsync: async () => {},
};

export async function getDatabase() {
  return mockDb as any;
}

export async function closeDatabase(): Promise<void> {
  // no-op on web
}
