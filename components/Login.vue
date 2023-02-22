<template>
  <div class="login-box">
    <el-form
      ref="formRef"
      :model="info"
      :rules="rules"
      size="large"
      @submit="handleSubmit"
    >
      <el-form-item prop="username">
        <el-input
          v-model="info.username"
          placeholder="请输入用户名"
          :suffix-icon="ElIconInfoFilled"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="info.password"
          placeholder="请输入密码"
          :suffix-icon="ElIconInfoFilled"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="tw-w-full" type="primary" @click="handleSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <div>
      <el-link type="primary">重置密码</el-link>
    </div>
    <div>
      <span>没有账号？</span>
      <el-link type="primary">创建账号</el-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
const formRef = ref<FormInstance>();
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
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
});

/**
 * 提交
 */
async function handleSubmit() {
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
}
</script>

<style scoped lang="scss">
.login-box {
  padding-top: 10vw;
  @apply tw-w-full tw-max-w-md tw-mx-auto;
}
</style>
