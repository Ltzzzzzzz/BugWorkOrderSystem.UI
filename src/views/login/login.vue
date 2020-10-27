<template>
  <div id="login" class="pageContainer">
    <div class="loginContainer">
      <div class="loginWrapper">
        <h1>BUG工单修复系统</h1>
        <div class="formWrapper">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="account">
              <input
                type="text"
                :readonly="!accountShow"
                placeholder="账号"
                v-model="form.account"
                @click="accountShow = true"
                @blur="accountShow = false"
                @keydown.enter="submitForm('form')"
              />
            </el-form-item>
            <el-form-item prop="password">
              <input
                :type="type"
                placeholder="密码"
                v-model="form.password"
                @keydown.enter="submitForm('form')"
              />
            </el-form-item>
            <el-form-item>
              <div class="button" @click="submitForm('form')">登陆</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      type: "password",
      accountShow: false,
      form: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "长度至少6位,最长16位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const params = {
            account: this.form.account,
            password: this.form.password
          };
          let res = await this.$api.user.login(params);
          this.$message({
            type: res.success ? "success" : "error",
            message: res.message
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "css/login.scss";
</style>
