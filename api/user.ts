import { LOGIN_URL } from "~/api/constant";
import type { AxiosResponse } from "axios";

/**
 * 登录
 *
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {AxiosResponse<{ access_token: string; }>} - jwt
 */
export function login(
  username: string,
  password: string
): AxiosResponse<{ access_token: string }> {
  const { $post } = useNuxtApp();
  return $post(LOGIN_URL, { username, password });
}