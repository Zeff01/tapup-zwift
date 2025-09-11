/**
 * Typed error handling utility for async operations
 * Returns a tuple of [error, data] similar to Go's error handling pattern
 */
export function catchErrorTyped<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[]
): Promise<[undefined, T] | [InstanceType<E>, undefined]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      if (errorsToCatch == undefined) {
        return [error, undefined] as [InstanceType<E>, undefined];
      }
      if (errorsToCatch.some((e) => error instanceof e)) {
        return [error, undefined] as [InstanceType<E>, undefined];
      }

      throw error;
    });
}