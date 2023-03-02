import { LOGIN_URL, REGISTER_URL } from "~/api/constant";
import type { AxiosResponse } from "axios";

/**
 * 登录
 *
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} reCAPTCHA - reCAPTCHA 的 token
 * @returns {AxiosResponse<{ access_token: string; }>} - jwt
 */
export function login(
  username: string,
  password: string,
  reCAPTCHA: string
): AxiosResponse<{ access_token: string }> {
  const { $post } = useNuxtApp();
  return $post(LOGIN_URL, { username, password, reCAPTCHA });
}

/**
 * 登录
 *
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} email - email
 */
export function register(
  username: string,
  password: string,
  email: string
): AxiosResponse<{ access_token: string }> {
  const { $post } = useNuxtApp();
  return $post(REGISTER_URL, { username, password, email });
}
