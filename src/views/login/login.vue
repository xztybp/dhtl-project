<template>
  <div class="login">
    <div class="message">
      <div class="header">
        <img src="../../assets/images/login-logo.png" alt width="214" />
      </div>
      <!-- :model="ruleForm" 是绑定我们form表单中需要提交给后台的一个对象 -->
      <!-- :rules="rules" 是动态绑定的rules，表单验证规则 -->
      <!-- ref="ruleForm"  是我们绑定的对象 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="code">
          <el-col :span="16">
            <el-input v-model="ruleForm.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button
              type="primary"
              @click="onSubmit"
              class="right"
              :disabled="!!timer"
            >{{ timer? `${count.toString().padStart(2,'0')}s后重新获取`:'发送验证码'}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item class="checkbox" prop="read">
          <el-checkbox v-model="ruleForm.read">
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-button
              type="primary"
              :loading="loading"
              @click="submitForm('ruleForm')"
              class="login-btn"
            >登录</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        mobile: '13911111111',
        code: '246810',
        read: false
      },
      loading: false,
      timer: null,
      count: 10,
      rules: {
        // 就是我们在el-form中绑定的rules，进行表单的验证
        mobile: [
          // 我们在el-form-item中绑定的prop，就是这里的属性名，需要大家注意，这具有唯一性
          // require:是否必填，如不设置，则会根据校验规则自动生成;message:是提示的内容；trigger：是什么事件触发
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          {
            pattern: '^1[3|4|5|7|8][0-9]{9}$',
            message: '请输入正确格式的电话号码',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }, // 'change'是表单获取焦点的时候会触发验证
          { min: 6, max: 6, message: '长度6个字符', trigger: 'blur' }
        ],
        read: [
          {
            required: true,
            pattern: /true/,
            message: '请阅读协议',
            trigger: 'change' // 'change'是表单的值改变的时候会触发验证
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.$axios({
            url: 'authorizations',
            method: 'POST',
            data: this.ruleForm
          }).then(res => {
            this.$message({
              message: '恭喜你，你已成功登陆',
              type: 'success'
            })
            setTimeout(() => {
              this.loading = false
              this.$router.push('/index')
            }, 1000)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmit () {
      this.$refs.ruleForm.validateField('mobile', err => {
        if (err) {
          return this.$message({
            showClose: true,
            message: '错了哦，手机号码有误,请重新输入',
            type: 'error'
          })
        }
        this.timer = setInterval(() => {
          this.count--
          if (this.count <= 0) {
            clearInterval(this.timer)
            this.count = 10
            this.timer = null
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="less">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/bgc.png");
  background-size: 100%;
  .message {
    width: 30%;
    padding: 30px 0;
    background-color: #fff;
    .header {
      text-align: center;
    }
    .el-form {
      padding: 25px 40px 0;
      .el-form-item {
        margin-bottom: 20px;
      }
      .el-form-item.code {
        position: relative;
        margin-right: 0;
        button.right {
          position: absolute;
          right: 0;
        }
      }
      .checkbox {
        margin-bottom: 20px;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
