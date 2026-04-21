/**
 * Constants used across validation utilities.
 */

export const MAX_STRING_LENGTH = 10_000;
export const MIN_STRING_LENGTH = 0;

export const EMAIL_MAX_LENGTH = 254;
export const URL_MAX_LENGTH = 2083;

export const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
export const ISO_DATETIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const COMMON_MIME_TYPES = [
  "application/json",
  "application/xml",
  "text/plain",
  "text/html",
  "text/css",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
] as const;

export type MimeType = (typeof COMMON_MIME_TYPES)[number];

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 20,
  maxPageSize: 100,
} as const;
