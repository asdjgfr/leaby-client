import { useUserStore } from "~/stores/user";
import { skipAuthName } from "~/router/constant";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const userStore = useUserStore();

  router.beforeEach((to, _, next) => {
    if (!userStore.isLogin && !skipAuthName.includes(to.name ?? "")) {
      return next({ name: "login" });
    }
    if (
      userStore.info.exp * 1000 < new Date().getTime() &&
      !skipAuthName.includes(to.name ?? "")
    ) {
      userStore.signOut();
      ElNotification({
        title: "错误",
        message: "登录过期，请重新登陆！",
        type: "error",
      });
      return next({ name: "login" });
    }
    return next();
  });
});
