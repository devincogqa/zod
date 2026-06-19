export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Return a single page of results using 1-indexed page numbers.
 *
 * The first page is `page === 1` and must contain `items[0 .. pageSize - 1]`.
 *
 * @param items the full, ordered list of items
 * @param page the 1-indexed page number (the first page is 1)
 * @param pageSize the maximum number of items per page
 */
export function paginate<T>(items: T[], page: number, pageSize: number): Page<T> {
  const start = page * pageSize;
  const end = start + pageSize;
  return {
    items: items.slice(start, end),
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize),
  };
}
