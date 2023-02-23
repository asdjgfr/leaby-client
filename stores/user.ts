import { acceptHMRUpdate, defineStore } from "pinia";
import { merge } from "lodash-es";
import jwtDecode from "jwt-decode";
import type { UserInfo } from "~/types/user";

export const useUserStore = defineStore("user", () => {
  const jwt = ref(localStorage.getItem("jwt") ?? "");
  const prevInfo: UserInfo = {
    countryCallingCode: 0,
    email: "",
    exp: 0,
    iat: 0,
    id: 0,
    phone: "",
    roles: "",
    slat: "",
    username: "",
  };
  const initInfo = Object.freeze({ ...prevInfo });
  try {
    merge(prevInfo, jwtDecode(jwt.value));
  } catch (e) {
    jwt.value = "";
  }

  const info = reactive<UserInfo>({
    ...prevInfo,
  });
  const isLogin = computed(() => jwt.value !== "");

  /**
   * 更新用户信息
   *
   * @param {string} _jwt - jwt
   * @returns {UserInfo} - 用户信息
   */
  function updateUser(_jwt: string) {
    jwt.value = _jwt;
    const params: UserInfo = jwtDecode(_jwt);
    merge(info, params);
    localStorage.setItem("jwt", _jwt);
    return params;
  }
  /**
   * 登出
   */
  function signOut() {
    jwt.value = "";
    merge(info, initInfo);
    localStorage.removeItem("jwt");
  }
  return {
    updateUser,
    info,
    jwt,
    isLogin,
    signOut,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
