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
      <el-form-item prop="email">
        <el-input v-model="info.email" placeholder="请输入邮箱" />
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
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="info.confirmPassword"
          placeholder="请再次输入密码"
          type="password"
          show-password
        >
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
  </div>
</template>

<script lang="ts" setup>
import {
  emailPattern,
  passwordPattern,
  usernamePattern,
} from "~/utils/validate";
import { passwordPlaceholder, usernamePlaceholder } from "~/utils/placeholder";
import { register } from "~/api/user";
import type { FormInstance, FormRules } from "element-plus";

const router = useRouter();
const formRef = ref<FormInstance>();
const loading = ref(false);
const info = reactive<{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const rules = reactive<FormRules>({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
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
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    {
      validator: (_, value, callback) => {
        if (!emailPattern.test(value)) {
          callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
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
  confirmPassword: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    {
      validator: (_, value, callback) => {
        if (value !== info.password) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
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

/**
 * 提交
 */
async function handleSubmit() {
  if (!formRef.value) return;
  try {
    loading.value = true;
    await formRef.value.validate();

    const res = await register(info.username, info.password, info.email);

    router.replace("/login");
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
