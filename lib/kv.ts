// Create a safe wrapper that handles missing KV credentials
const mockKv = {
  get: async <T>(): Promise<T | null> => null,
  set: async (): Promise<string> => 'OK',
  del: async (): Promise<number> => 0,
  exists: async (): Promise<number> => 0,
  keys: async (): Promise<string[]> => [],
}

let kv: typeof mockKv

try {
  // Check if KV credentials are available
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    // Dynamically import only if credentials are present
    const vercelKvModule = require('@vercel/kv')
    kv = vercelKvModule.kv
  } else {
    kv = mockKv
  }
} catch (error) {
  // If KV initialization fails, use mock
  kv = mockKv
}

export { kv }

