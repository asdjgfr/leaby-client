import axios from "axios";
import { pool } from "~/api";
import { isTimeout } from "~/utils/validate";
import { LOGIN_URL } from "~/api/constant";

declare module "axios" {
  export interface AxiosRequestConfig {
    _cancelSameUrlRequest?: boolean;
  }
}

/**
 * 生成连接池的 key
 *
 * @param {string} method - 方法
 * @param {string} url - url
 * @returns {string} - key 值
 */
export function poolKey(method: string | undefined, url: string | undefined) {
  return `${method?.toLowerCase()}::${url}`;
}
export default defineNuxtPlugin(() => {
  const accessToken = localStorage.getItem("access_token");
  const instance = axios.create();

  instance.interceptors.request.use(
    (config) => {
      const abortController = new AbortController();
      config.signal = abortController.signal;
      const preUrl = poolKey(config.method, config.url);
      // 同方法同url取消上次请求
      if (pool.has(preUrl) && (config._cancelSameUrlRequest ?? true)) {
        pool.get(preUrl)?.forEach((item) => {
          item.abortController.abort();
        });
        pool.delete(preUrl);
        // eslint-disable-next-line no-console
        console.warn(`${preUrl} 请求重复`);
      }
      if (pool.has(preUrl)) {
        pool.get(preUrl)?.push({ abortController, config });
      } else {
        pool.set(preUrl, [{ abortController, config }]);
      }

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (err) => {
      // eslint-disable-next-line no-console
      console.error("请求拦截err:", err);
      // 对请求错误做些什么
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    async (response) => {
      const router = useRouter();
      pool.delete(poolKey(response.config.method, response.config.url));
      if (response.request.responseType === "blob") {
        return Promise.resolve(response);
      }
      if (response.data.code === 401 && response.config.url !== LOGIN_URL) {
        await router.replace({
          path: "/401",
        });
      }
      return Promise.resolve(response);
    },
    // 对异常响应处理
    (err) => {
      ElLoading.service().close();
      if (err.response?.config?.url !== undefined) {
        pool.delete(
          poolKey(err.response.config.method, err.response.config.url)
        );
      }

      let text = err.response.data.message;
      if (err.response?.status >= 500) {
        switch (err.response?.status) {
          case 500:
            text = "服务器内部错误";
            break;
          case 501:
            text = "服务器不支持请求的功能";
            break;
          case 502:
          case 504:
            text = "网关错误";
            break;
          case 503:
            text = "服务器超载";
            break;
          default:
            text = "服务器错误" + (err.response.data.message ?? "");
        }
        ElNotification({
          title: "错误",
          message: text,
          type: "error",
        });
        return Promise.reject(new Error(text));
      }
      if (
        err.code === "ECONNABORTED" &&
        isTimeout.test(err.response.data.message)
      ) {
        text = "请求超时";
      } else if (err.code === "ERR_NETWORK") {
        text = "网络错误";
      }
      // 如果是取消请求，则不显示提示
      if (err.code === "ERR_CANCELED") {
        return Promise.reject(err.response.data.message);
      }
      if (err.response?.status === 401) {
        text = "授权失败";
      }
      ElNotification({
        title: "错误",
        message: text,
        type: "error",
      });

      return Promise.reject(err);
    }
  );

  return {
    provide: {
      ...instance,
    },
  };
});
