<template>
  <div v-loading="loading" class="login-box">
    <el-form
      ref="formRef"
      :model="info"
      :rules="rules"
      size="large"
      @submit.prevent
    >
      <el-form-item prop="username">
        <el-input v-model="info.username" placeholder="请输入用户名">
          <template #suffix>
            <ClientOnly>
              <el-tooltip
                :content="usernamePlaceholder"
                :visible="tooltipVisible.username"
              >
                <el-icon>
                  <ElIconInfoFilled
                    @mouseenter="tooltipVisible.username = true"
                    @mouseleave="tooltipVisible.username = false"
                  />
                </el-icon>
              </el-tooltip>
            </ClientOnly>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="info.password"
          placeholder="请输入密码"
          type="password"
          show-password
        >
          <template #suffix>
            <ClientOnly>
              <el-tooltip
                :content="passwordPlaceholder"
                :visible="tooltipVisible.password"
              >
                <el-icon>
                  <ElIconInfoFilled
                    @mouseenter="tooltipVisible.password = true"
                    @mouseleave="tooltipVisible.password = false"
                  />
                </el-icon>
              </el-tooltip>
            </ClientOnly>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="tw-w-full"
          type="primary"
          native-type="submit"
          @click="handleSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <div class="tw-text-center">
      <p>
        <el-link type="primary">重置密码</el-link>
      </p>
      <p>
        <span>没有账号？</span>
        <el-link type="primary">创建账号</el-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { passwordPattern, usernamePattern } from "~/utils/validate";
import { passwordPlaceholder, usernamePlaceholder } from "~/utils/placeholder";
import { login } from "~/api/user";
import { useUserStore } from "~/stores/user";
import type { FormInstance, FormRules } from "element-plus";

const config = useRuntimeConfig();
const router = useRouter();
const userStore = useUserStore();
const formRef = ref<FormInstance>();
const loading = ref(false);
const info = reactive<{
  username: string;
  password: string;
}>({
  username: "",
  password: "",
});

const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      validator: (_, value, callback) => {
        if (!usernamePattern.test(value)) {
          callback(new Error(" "));
          toggleTooltip("username", true);
        } else {
          callback();
          toggleTooltip("username", false);
        }
      },
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      validator: (_, value, callback) => {
        if (!passwordPattern.test(value)) {
          callback(new Error(" "));
          toggleTooltip("password", true);
        } else {
          callback();
          toggleTooltip("password", false);
        }
      },
      trigger: "blur",
    },
  ],
});

const tooltipVisible = reactive(
  Object.keys(rules).reduce((acc, cur) => {
    acc[cur] = false;
    return acc;
  }, {} as Record<string, boolean>)
);

onMounted(() => {
  if (userStore.isLogin) {
    router.replace("/");
  }
});

/**
 * 提交
 */
async function handleSubmit() {
  if (!formRef.value) return;
  try {
    loading.value = true;
    await formRef.value.validate();
    const token = await grecaptcha.execute(config.public.RE_CAPTCHA_SITE_KEY, {
      action: "submit",
    });

    const res = await login(info.username, info.password, token);
    userStore.updateUser(res.data.access_token);
    router.replace("/");
  } catch (e) {}
  loading.value = false;
}

/**
 * 切换 tooltip
 *
 * @param {string} name - key
 * @param {boolean} bool -  是否显示
 */
function toggleTooltip(name: string, bool?: boolean) {
  tooltipVisible[name] = bool ?? !bool;
}
</script>

<style scoped lang="scss">
.login-box {
  padding-top: 10vw;
  @apply tw-w-full tw-max-w-md tw-mx-auto tw-px-8;
}
</style>
