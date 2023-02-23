import type { AxiosRequestConfig } from "axios";
export const pool = new Map<
  string,
  [{ abortController: AbortController; config: AxiosRequestConfig }]
>();
