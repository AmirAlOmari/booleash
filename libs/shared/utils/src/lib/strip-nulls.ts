export function stripNulls<T extends object>(obj: T): T {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === null) {
      return acc;
    }

    return {
      ...acc,
      [key]: value,
    };
  }, {} as T);
}
