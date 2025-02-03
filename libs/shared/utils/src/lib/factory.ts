export function factory<T extends object>(
  classType: new () => T,
  partial?: Partial<T>
): T {
  const instance = new classType();

  return Object.assign(instance, partial);
}
