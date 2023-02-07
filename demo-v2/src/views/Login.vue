/**登录页*/
<template>
  <div class="login">
    <div class="box">
      <h1>iHRM后台登录系统</h1>
      <el-input
        placeholder="请输入内容"
        v-model="form.mobile"
        @blur="mobileCheck"
      >
        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
      </el-input>
      <transition>
        <span class="rules rule_mobile" v-show="isEmpty">手机号不能为空</span>
      </transition>
      <transition>
        <span class="rules rule_mobile" v-show="isError"
          >您的手机号格式不正确</span
        >
      </transition>

      <el-input
        placeholder="请输入内容"
        v-model="form.password"
        show-password
        @blur="passwordCheck"
      >
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>
      <transition>
        <span class="rules rule_password" v-show="isEmpty2">密码不能为空</span>
      </transition>

      <transition>
        <span class="rules rule_password" v-show="isError2"
          >密码的长度在6-16位之间</span
        >
      </transition>

      <el-button type="primary" @click="handle">登录</el-button>
      <p>
        <span>账号：13800000002</span>
        <span>密码：123456</span>
      </p>
    </div>
  </div>
</template>

<script>
import { login } from "../api/login";
import { setToken } from "../untils/auth";
export default {
  data() {
    return {
      // 登录参数
      form: {
        mobile: "13800000002",
        password: "123456",
      },
      /**手机号判空 */
      isEmpty: false,
      /**手机号校验 */
      isError: false,
      /**密码判空 */
      isEmpty2: false,
      /**密码校验 */
      isError2: false,
    };
  },
  methods: {
    // 手机号检验
    mobileCheck() {
      // console.log(111);
      if (this.form.mobile == "") {
        this.isEmpty = true;
        this.isError = false;
      } else {
        this.isEmpty = false;
        let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
        this.isError = !reg.test(this.form.mobile);
      }
    },
    passwordCheck() {
      if (this.form.password == "") {
        this.isEmpty2 = true;
        this.isError2 = false;
      } else {
        this.isEmpty2 = false;
        let reg2 = /^\d{6,16}$/;
        this.isError2 = !reg2.test(this.form.password);
      }
    },
    // 登录
    handle() {
      login(this.form).then((res) => {
        console.log(res);
        setToken(res.data.data)
        if (res.data.success) {
          this.$router.push('/index')
        }else{
          this.$message.error('用户名或密码错误');
        }
      });
    },
  },
  created() {},
};
</script>

<style lang='scss' scoped>
* {
  color: #fff;
}
.login {
  height: 100vh;
  width: 100vw;
  background-image: url(http://ihrm.itheima.net/static/img/login.c75bab6d.jpg);
  background-position: 50%;
  position: relative;
}
.box {
  width: 463px;
  height: 450px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background: pink;
  h1 {
    font-weight: 100;
    font-size: 46px;
    letter-spacing: 6px;
    text-align: center;
    margin-bottom: 26px;
  }
  ::v-deep .el-input__inner {
    // margin: 10px 0;
    height: 52px;
    margin: 10px 0;
    background: #d3e4ff;
    color: #68b0fe;
    padding-left: 40px;
  }
  .el-input__icon {
    color: #889aa4;
    font-size: 18px;
    margin-left: 5px;
  }
  .el-button {
    margin: 10px 0 30px;
    height: 58px;
    width: 100%;
    font-size: 25px;
    background: #407ffe;
  }
  p {
    font-size: 14px;
    span {
      margin-right: 25px;
    }
  }
  .rules {
    font-size: 12px;
    position: absolute;
    left: 0;
  }
  .rule_mobile {
    top: 150px;
  }
  .rule_password {
    top: 222px;
  }
}
/*动画效果的类名,之前是随意的设定,现在需要修改为Vue可以只能识别的类名*/
.v-enter-active {
  /*表示执行的动画效果,后面的属性表示动画将在1S内完成*/
  animation: translate 0.1s;
}
.v-leave-active {
  /*表示执行的动画效果,后面的属性表示动画将在一秒内完成,并且反转动画的效果*/
  animation: translate 0.1s reverse;
}
/*使用@keyframes来创建一个动画,后面跟着的字符串就是动画的名字,from表示开始,to表示结束*/
/*这是一个简单的动画,*/
@keyframes translate {
  from {
    /*CSS transform 属性允许你旋转，缩放，倾斜或平移给定元素。*/
    /*其中translateX就表示按X轴,也就是横向的平移这个元素,平移百分之一百也就是完全的向左移除屏幕*/
    /*如果是正数则表示向右移除*/
    transform: translateY(-50%);
  }
  to {
    /*表示动画结束时的样式,动画结束时,平移百分之0也就是恢复原位,整体的动画效果表示为从屏幕左边逐渐平移到屏幕中间*/
    transform: translateY(0);
  }
}
</style>
