<style lang="less">
  /*
    取消默认的margin和padding距离
   */
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background: #000000;
  }

  //清除浮动
  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    overflow: hidden;
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }

  .clearit {
    clear: both;
    height: 0;
    font-size: 0;
    overflow: hidden;
  }

  .banner {
    background: url("./img/banner.jpg") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    width: 100%;
    height: 10.6rem;
  }

  .section1 {
    background: url("./img/bg1.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    width: 95%;
    margin: 0 auto;
    height: 9.94rem;

    & > img {
      display: inline-block;
      margin-top: 1.1rem;
      height: .88rem;
      margin-left: 3.4rem;
    }
    & > .phone {
      margin: .2rem auto;
      width: 85%;
      height: 1.12rem;
      border: 1px solid #d0d0d4;
      border-radius: .05rem;
      & > img {
        float: left;
        margin-top: .25rem;
        margin-left: .3rem;
        display: inline-block;
        width: 8%;
        height: .62rem;
        width: .42rem;
      }
      & > input {
        float: left;
        margin-left: .3rem;
        font-size: .36rem;
        margin-top: .35rem;
        background: #252121;
        color: #ffffff;
        border: 0;
      }
    }

    & > .picCode {
      margin: .2rem auto;
      width: 85%;
      height: 1.12rem;
      border: 1px solid #d0d0d4;
      border-radius: .05rem;
      & > .smsPic {
        float: left;
        margin-top: .25rem;
        margin-left: .21rem;
        display: inline-block;
        width: 8%;
        height: .62rem;
        width: .58rem;
      }
      & > input {
        float: left;
        margin-left: .21rem;
        font-size: .36rem;
        margin-top: .35rem;
        background: #252121;
        color: #ffffff;
        border: 0;
      }
      & > .sms {
        float: right;
        margin-top: .04rem;
        margin-right: .21rem;
        display: inline-block;
        width: 8%;
        height: 90%;
        width: 2.5rem;
      }
    }

    & > .smsCode {
      width: 85%;
      margin: .2rem auto;
      & > .left {
        float: left;
        height: 1.12rem;
        width: 50%;
        border: 1px solid #d0d0d4;
        border-radius: .05rem;
        & > img {
          float: left;
          margin-top: .37rem;
          margin-left: .21rem;
          display: inline-block;
          width: 8%;
          height: .43rem;
          width: .58rem;
        }
        & > input {
          float: left;
          margin-left: .21rem;
          font-size: .36rem;
          margin-top: .35rem;
          background: #252121;
          color: #ffffff;
          border: 0;
          width: 60%;
        }
      }

      & > .right {
        float: right;
        height: 1.2rem;
        width: 3.8rem;
        background: url("./img/msgBg.png") no-repeat;
        -webkit-background-size: 3.8rem 1.18rem;
        font-family: 微软雅黑;
        font-size: .48rem;
        line-height: 1.12rem;
        text-align: center;
        color: #ffffff;
      }
    }

    & > .pwd {
      margin: .2rem auto;
      width: 85%;
      height: 1.12rem;
      border: 1px solid #d0d0d4;
      border-radius: .05rem;
      & > img {
        float: left;
        margin-top: .28rem;
        margin-left: .3rem;
        display: inline-block;
        width: 8%;
        height: .58rem;
        width: .42rem;
      }
      & > input {
        float: left;
        margin-left: .3rem;
        font-size: .36rem;
        margin-top: .35rem;
        background: #252121;
        color: #ffffff;
        border: 0;
      }
    }

    .toRegist {
      margin: .38rem auto;
      width: 85%;
      height: 1.12rem;
      background: url("./img/toRegist.png") no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
      text-align: center;
      font-size: .48rem;
      color: #ffffff;
      line-height: 1.12rem;
      font-family: 微软雅黑;
    }
  }

  .section2 {
    background: url("./img/bg2.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    width: 95%;
    margin: .5rem 0 2.5% 2.5%;
    height: 15rem;
    text-align: center;

    & > img {
      margin-top: 1.16rem;
      height: .65rem;
    }

    & > .titleContent {
      line-height: .67rem;
      & > .title {
        display: inline-block;
        text-align: center;
        font-size: .36rem;
        color: #999999;
        height: .67rem;
        border-bottom: 1px solid #FFFFFF;
      }
    }
    & > .section2Content {
      margin-left: .77rem;
      margin-top: .4rem;
      .section2Item {
        float: left;
        width: 3.87rem;
        height: 3.68rem;
        border-radius: .27rem;
        background: #285e61;
        margin-top: .4rem;
        margin-left: .4rem;

        line-height: .53rem;

        & > .title {
          display: block;
          padding-top: .4rem;
          font-size: .37rem;
          color: #d0d0d4;
          line-height: .53rem;
        }

        & > img {
        }

        & > .desc {

        }

        & i {
          color: #8cf7b2;
          font-family: Myriad Pro;
          font-style: normal;
          font-size: .54rem;
        }
      }
    }
    & > .toRegist2 {
      color: #FFFFFF;
      background: url("./img/toRegist2.png") no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
      margin: .6rem auto;
      width: 85%;
      font-size: .48rem;
      line-height: 1.13rem;
      font-family: "微软雅黑";
    }
  }

  .a {
    color: #000;
  }

</style>

<template>
  <div id="app">
    <div class="banner">
    </div>
    <div class="section1">
      <img src="./img/lhb.jpg" alt="">
      <div class="phone">
        <img src="./img/phone.png" alt="">
        <input type="text" value="输入手机号">
      </div>
      <div class="picCode">
        <img class="smsPic" src="./img/smsPic.png" alt="">
        <input type="text" value="请输入右侧验证码">
        <img class="sms" src="./img/sms.png" alt="">
      </div>
      <div class="smsCode clearfix">
        <div class="left">
          <img src="./img/msg.png" alt="">
          <input type="text" value="短信验证码">
        </div>
        <div class="right">
          获取验证码
        </div>
      </div>
      <div class="pwd">
        <img src="./img/pwd.png" alt="">
        <input type="text" value="设置密码（6-16位字符）">
      </div>
      <div class="toRegist">
        立即注册
      </div>
    </div>
    <div class="section2">
      <img src="./img/cjs.png" alt="">
      <div class="titleContent">
        <span class="title">
          &nbsp;&nbsp;出借平台85天直投项目即送&nbsp;&nbsp;
        </span>
      </div>
      <div class="section2Content clearfix">
        <div class="section2Item">
          <span class="title">首投<i>2000</i>元<br>即送小米移动电源</span>
        </div>
        <div class="section2Item">
          <span class="title">首投<i>2000</i>元<br>即送小米移动电源</span>
        </div>
        <div class="section2Item">
          <span class="title">首投<i>2000</i>元<br>即送小米移动电源</span>

        </div>
        <div class="section2Item">
          <span class="title">首投<i>2000</i>元<br>即送小米移动电源</span>
        </div>
      </div>
      <div class="toRegist2">
        马上领大奖
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
