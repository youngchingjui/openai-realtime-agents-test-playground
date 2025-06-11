/**
 * normalizeEventKeys - Recursively convert all object keys from snake_case to camelCase.
 * Use at the event entry point to ensure all downstream code uses camelCase only.
 */
export function normalizeEventKeys<T = any>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(normalizeEventKeys) as any;
  } else if (obj && typeof obj === 'object' && obj.constructor === Object) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
      acc[camelKey] = normalizeEventKeys(value);
      return acc;
    }, {} as any);
  }
  return obj;
}
