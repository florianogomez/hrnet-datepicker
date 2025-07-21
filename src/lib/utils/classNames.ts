/**
 * Safely combines multiple CSS class names into a single string.
 *
 * Filters out falsy values (undefined, null, false, empty string),
 * removes duplicates, and trims extra spaces.
 *
 * @param classes - List of class names to combine (strings or falsy values).
 * @returns A single string of combined class names, separated by spaces.
 *
 * @example
 * classNames('foo', undefined, 'bar', false, 'foo') // 'foo bar'
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((cls): cls is string => Boolean(cls))
    .join(' ')
    .trim();
}
