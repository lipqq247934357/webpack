<template>
  <div id="app" class="allbg wrap">
    <!-- 页面开始 -->
    <div class="activityBanner">
    </div>
    <div class="actCont1Bg">
      <div class="actCont1">
        <p class="pTitle">暖冬人人有金</p>
        <div class="prizeArea">
          <p class="pDesc">活动期间，根据您当天的出借笔数，每出借一笔就能获得一次刮卡机会，次数仅限当天有效哦</p>
          <div class="scratch">
            <!-- 开奖前-->
            <div class="beforeLottery" style="display:none">
              <a class="db tc borRadius15" href="javascript:;">点击开奖</a>
            </div>
            <!-- 开奖后-->
            <div class="afterLottery" style="display:none">
              <p class="tc">恭喜您获得<span>200</span>元现金</p>
              <a class="db tc borRadius15" href="javascript:;">再开一次</a>
            </div>
            <!-- 没有开奖机会-->
            <div class="beforeLottery noChance">
              <a class="db tc borRadius15" href="javascript:;">点击开奖</a>
              <p class="tc">再出借一笔，就能获得刮卡机会哦</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actCont2Bg">
      <div class="actCont2">
        <div class="winnerList" id="bonustable">
          <ul class="bd">
            <li>李女士刚刚获得了100元现金奖励</li>
            <li>李女士刚刚获得了黄金鸡宠物转运珠一颗</li>
            <li>李女士刚刚获得了20元现金奖励</li>
            <li>李女士刚刚获得了100元现金奖励</li>
            <li>李女士刚刚获得了黄金鸡宠物转运珠一颗</li>
            <li>李女士刚刚获得了20元现金奖励</li>
            <li>李女士刚刚获得了100元现金奖励</li>
            <li>李女士刚刚获得了黄金鸡宠物转运珠一颗</li>
            <li>李女士刚刚获得了20元现金奖励</li>
            <li>李女士刚刚获得了100元现金奖励</li>
            <li>李女士刚刚获得了黄金鸡宠物转运珠一颗</li>
            <li>李女士刚刚获得了20元现金奖励</li>
          </ul>
        </div>
        <div class="investInfo borRadius15">
          <p class="tc">您今日已出借**笔，可获的**次刮卡，<br/>已累计获得了**元奖励。</p>
        </div>
        <a class="db tc borRadius15" href="">立即出借</a>
      </div>
    </div>
    <div class="actCont3Bg">
      <div class="actCont3">
        <p class="pTitle">暖冬返现红包</p>
        <div class="returnRed">
          <p class="pDesc tc">单笔出借金额满足条件，即可领取暖冬返现红包</p>
          <div class="returnRule">
            <ul>
              <li class="clearfix"><p>出借金额(元)</p><p>奖励</p></li>
              <li class="clearfix bg1 borRadius5"><p>1万-5万</p><p>每一万奖励20元</p></li>
              <li class="clearfix bg2 borRadius5"><p>6万-20万</p><p>每一万奖励25元</p></li>
              <li class="clearfix bg3 borRadius5"><p>21万以上</p><p>每一万奖励30元</p></li>
            </ul>
          </div>
        </div>
        <div class="investInfo borRadius15">
          <p class="tc">您当前的出借金额为：***元，<br/>已获得***元现金</p>
        </div>
      </div>
    </div>
    <div class="actCont4Bg">
      <div class="actCont4">
        <p class="pTitle">暖冬邀请礼金</p>
        <div class="inviteGift">
          <p class="pDesc tc">活动期间，邀请4名好友实名注册，就能<br/>跟好友平分邀请礼金。</p>
          <dl>
            <dt><img src="img/act_17_12_1/cashGift.png" alt=""></dt>
            <dd>
              <a class="db tc borRadius15" href="">立即邀请，平分现金</a>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="actCont5Bg">
      <div class="actCont5">
        <p class="pTitle">活动说明</p>
        <div class="actRule">
          <p>1、活动时间：2017年12月4日00:00:00~12月13日23:59:59；</p>
          <p>2、老虎活期、转让项目不参与活动；</p>
          <p>3、现金奖励在投资完成以后，即刻发送至您的【优惠券】中；</p>
          <p>4、刷奖、冒用他人身份证、银行卡者一经核实，取消活动资格，所得奖励不予承兑；</p>
          <p>5、本活动最终解释权归两只老虎所有，如有疑问请咨询：400-990-3337</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    background-image: -moz-linear-gradient(90deg, rgb(221, 26, 60) 0%, rgb(109, 8, 148) 100%);
    background-image: -webkit-linear-gradient(90deg, rgb(221, 26, 60) 0%, rgb(109, 8, 148) 100%);
    background-image: -ms-linear-gradient(90deg, rgb(221, 26, 60) 0%, rgb(109, 8, 148) 100%);
  }

  a {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .wrap {
    max-width: 750px;
  }

  .borRadius15 {
    border-radius: .15rem;
    -webkit-border-radius: .15rem;
    -moz-border-radius: .15rem;
    -o-border-radius: .15rem;
  }

  .borRadius5 {
    border-radius: .05rem;
    -webkit-border-radius: .05rem;
    -moz-border-radius: .05rem;
    -o-border-radius: .05rem;
  }

  .borRadius35 {
    border-radius: .35rem;
    -webkit-border-radius: .35rem;
    -moz-border-radius: .35rem;
    -o-border-radius: .35rem;
  }

  .borRadius25 {
    border-radius: .475rem;
    -webkit-border-radius: .475rem;
    -moz-border-radius: .25rem;
    -o-border-radius: .25rem;
  }

  .activityBanner{
    width: 100%;
    height:4rem;
    margin:0 auto;
    background: url("./img/banner.jpg") no-repeat;
    -webkit-background-size:100%;
  }

  .actCont1Bg {
    height: 6.8rem;
    background: url("img/bg1.jpg") no-repeat;
    background-size: 100% auto;
    padding-top: .3rem;
  }

  .actCont2Bg {
    height: 6.09rem;
    background: url("img/bg2.jpg") no-repeat;
    background-size: 100% auto;
    padding-top: .25rem;
  }

  .actCont3Bg {
    height: 9.56rem;
    background: url("img/bg3.jpg") no-repeat;
    background-size: 100% auto;
  }

  .actCont4Bg {
    height: 8.89rem;
    background: url("img/bg4.jpg") no-repeat;
    background-size: 100% auto;
  }

  .actCont5Bg {
    height: 6.65rem;
    background: url("img/bg5.jpg") no-repeat;
    background-size: 100% auto;
  }

  .actCont1 p.pTitle, .actCont3 p.pTitle, .actCont4 p.pTitle, .actCont5 p.pTitle {
    width: 3.6rem;
    height: .61rem;
    padding-left: 1.16rem;
    font-size: .46rem;
    color: #fff;
    margin: 0 auto;
    background: url("img/titleBg.png") center center no-repeat;
    background-size: 100% auto;
  }

  .prizeArea, .returnRed, .inviteGift {
    width: 6.12rem;
    height: 5.48rem;
    margin: .3rem auto 0;
    background: url("img/contBg1.png") no-repeat;
    background-size: 100% auto;
    padding: .4rem .54rem 0;
  }

  .inviteGift {
    height: 6.78rem;
    margin: .3rem auto 0;
    background: url("img/contBg2.png") no-repeat;
    background-size: 100% auto;
  }

  .prizeArea p.pDesc, .inviteGift p.pDesc {
    font-size: .26rem;
    color: #fff;
    line-height: .42rem;
    height: 1.16rem;
  }

  .scratch {
    width: 5.2rem;
    height: 2.26rem;
    padding: .24rem .14rem;
    background: url("img/scratchBg.png") no-repeat;
    background-size: 100% auto;
    margin: 1.1rem 0 0 .3rem;
  }

  .beforeLottery {
    width: 5.2rem;
    height: 1.62rem;
    background: url("img/scratchBg2.png") no-repeat;
    padding-top: .64rem;
  }

  .beforeLottery a, .afterLottery a {
    width: 2.94rem;
    height: .9rem;
    line-height: .9rem;
    font-size: .36rem;
    background: #ff5251;
    color: #fff;
    margin: 0 auto;
  }

  .afterLottery {
    width: 5.2rem;
    height: 1.62rem;
    background: url("img/scratchBg3.png") no-repeat;
    padding-top: .6rem;
  }

  .afterLottery p {
    font-size: .32rem;
    color: #ff5251;
  }

  .afterLottery p span {
    font-size: .46rem;
    color: #ff5251;
  }

  .afterLottery a {
    height: .64rem;
    line-height: .64rem;
    font-size: .3rem;
    margin-top: .2rem;
  }

  .noChance a {
    background: #a5a5a5;
  }

  .noChance p {
    font-size: .22rem;
    color: #666;
    margin-top: .2rem;
  }

  .winnerList {
    width: 6.98rem;
    height: 1.22rem;
    margin: 0 auto;
    background: url("img/winningBg.png") no-repeat;
    background-size: 100% auto;
    padding: .68rem 0 .2rem;
  }

  .winnerList ul {
    height: 1.22rem;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .winnerList ul li {
    height: 1.5rem;
    font-size: .3rem;
    color: #fff;
    text-align: center;
  }

  .investInfo {
    background: rgba(21, 0, 0, .12);
    width: 6.92rem;
    margin: .48rem auto;
    padding: .2rem 0;
  }

  .investInfo p {
    line-height: .48rem;
    font-size: .28rem;
    color: #fff;
  }

  .actCont2 a, .inviteGift dl dd a {
    width: 5.42rem;
    height: .98rem;
    line-height: .98rem;
    color: #fff;
    font-size: .36rem;
    margin: 0 auto;
    background-image: -moz-linear-gradient(90deg, rgb(255, 65, 65) 0%, rgb(239, 143, 50) 100%);
    background-image: -webkit-linear-gradient(90deg, rgb(255, 65, 65) 0%, rgb(239, 143, 50) 100%);
    background-image: -ms-linear-gradient(90deg, rgb(255, 65, 65) 0%, rgb(239, 143, 50) 100%);
  }

  .returnRed p.pDesc {
    font-size: .26rem;
    color: #fff;
    line-height: .96rem;
  }

  .returnRule ul {
    width: 6.18rem;
    margin: 1.4rem auto 0;
  }

  .returnRule ul li {
    margin-bottom: .2rem;
  }

  .returnRule ul li p {
    width: 50%;
    float: left;
    text-align: center;
    font-size: .28rem;
    color: #fff;
    height: .5rem;
    line-height: .5rem;
  }

  .returnRule ul li.bg1 {
    background: rgba(255, 34, 212, .2);
  }

  .returnRule ul li.bg2 {
    background: rgba(255, 34, 212, .45);
  }

  .returnRule ul li.bg3 {
    background: rgba(255, 34, 212, .3);
  }

  .inviteGift dl {
    margin-top: .86rem;
  }

  .inviteGift dl dt img {
    width: 6.5rem;
    margin-left: -.2rem;
  }

  .inviteGift dl dd a {
    width: 3.62rem;
    height: .8rem;
    line-height: .8rem;
    font-size: .29rem;
    margin-top: -.3rem;
  }

  .actCont5 p.pTitle {
    width: 2.64rem;
    height: .62rem;
    padding-left: 1.2rem;
    background: url("img/titleBg2.png") center center no-repeat;
    background-size: 100% auto;
  }

  .actRule {
    width: 6.02rem;
    height: 4rem;
    padding: .5rem;
    margin: .32rem auto 0;
    background: url("img/contBg5.png") no-repeat;
    background-size: 100% auto;
  }

  .actRule p {
    font-size: .26rem;
    line-height: .44rem;
    color: #fff;
  }
</style>
