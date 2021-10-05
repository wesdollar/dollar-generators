/**
 * Hook for logging and handling errors.
 *
 * @param message human-readable error message
 * @param error error stack, likely from a catch
 */
export const errorLogger = (message: string, error: unknown): void => {
  // eslint-disable-next-line no-console
  console.error(message, error);
};
