// Pagination helpers for slicing result sets.

export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function paginate<T>(items: readonly T[], page: number, pageSize: number): Page<T> {
  if (pageSize <= 0) throw new Error("pageSize must be greater than 0");
  const totalPages = Math.floor(items.length / pageSize);
  const start = (page - 1) * pageSize;
  const slice = items.slice(start, start + pageSize);
  return {
    items: slice,
    page,
    pageSize,
    totalItems: items.length,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

export function pageRange(totalItems: number, pageSize: number): number[] {
  const pages: number[] = [];
  const totalPages = Math.ceil(totalItems / pageSize);
  for (let i = 1; i <= totalPages; i++) pages.push(i);
  return pages;
}

export function clampPage(page: number, totalPages: number): number {
  if (Number.isNaN(page)) return 1;
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
}
