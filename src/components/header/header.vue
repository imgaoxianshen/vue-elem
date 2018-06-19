<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" />
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>

            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%">
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="youhui-title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item,index) in seller.supports" v-bind:key="item.id">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="youhui-title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import star from "components/star/star";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    };
  },
  created () {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    showDetail () {
      this.detailShow = true;
    },
    hideDetail () {
      this.detailShow = false;
    }
  },
  components: {
    star
  }
};
</script>

<style>
.header {
  color: #fff;
  position: relative;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
}

.content-wrapper {
  padding: 24px 12px 18px 24px;
  font-size: 0;
  position: relative;
}

.avatar {
  display: inline-block;
  font-size: 14px;
  vertical-align: top;
}

.avatar img {
  border-radius: 2px;
}

.content {
  display: inline-block;
  margin-left: 16px;
}

.title {
  margin: 2px 0 8px 0;
}

.brand {
  display: inline-block;
  width: 30px;
  height: 18px;
  background-image: url("brand@2x.png");
  background-size: 30px 18px;
  background-repeat: no-repeat;
  vertical-align: top;
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .barnd {
    background-image: url("brand@3x.png");
  }
}

.name {
  margin-left: 6px;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}

.description {
  margin-bottom: 10px;
  line-height: 12px;
  font-size: 12px;
}

.icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
}

.decrease {
  background-image: url("decrease_1@2x.png");
}

.discount {
  background-image: url("discount_1@2x.png");
}

.guarantee {
  background-image: url("guarantee_1@2x.png");
}

.invoice {
  background-image: url("invoice_1@2x.png");
}

.special {
  background-image: url("special_1@2x.png");
}

.text {
  font-size: 12px;
  line-height: 14px;
}

.support-count {
  position: absolute;
  right: 12px;
  bottom: 14px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}

.count {
  font-size: 10px;
  vertical-align: top;
}

.icon-keyboard_arrow_right {
  font-size: 10px;
  line-height: 24px;
  margin-left: 2px;
}

.bulletin-wrapper {
  height: 28px;
  line-height: 28px;
  padding: 0 22px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  background-color: rgba(7, 17, 27, 0.2);
}

.bulletin-title {
  display: inline-block;
  width: 22px;
  height: 12px;
  background: url("bulletin@2x.png");
  background-size: 22px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
  margin-top: 8px;
}

.bulletin-text {
  font-size: 10px;
  font-weight: 200;
  margin: 0 4px;
  vertical-align: top;
}

.bulletin-wrapper .icon-keyboard_arrow_right {
  position: absolute;
  font-size: 10px;
  right: 12px;
  top: 3px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}

.detail {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(7, 17, 27, 0.8);
  -webkit-backdrop-filter: blur(10px);
  top: 0;
  left: 0;
}

.detail-wrapper {
  min-height: 100%;
}

.detail-main {
  padding-top: 32px;
  padding-bottom: 64px;
}

.detail-close {
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32px;
}

.name {
  line-height: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}

.star-wrapper {
  margin-top: 18px;
  padding: 2px 0;
  text-align: center;
}

.youhui-title {
  display: flex;
  width: 80%;
  margin: 28px auto 24px auto;
}

.line {
  flex: 1;
  position: relative;
  top: -6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.youhui-title .text {
  padding: 0 12px;
  font-weight: 700;
  font-size: 14px;
}

.supports {
  width: 80%;
  margin: 0 auto;
}

.support-item {
  padding: 0 12px;
  margin-bottom: 12px;
  font-size: 0;
}

.support-item:last-child {
  margin-bottom: 0;
}

.support-item .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right: 6px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}

.support-item .text {
  line-height: 16px;
  font-size: 12px;
}

.bulletin {
  width: 80%;
  margin: 0 auto;
}

.bulletin .content {
  line-height: 24px;
  font-size: 12px;
}

.fade-enter,
.fade-leave-to{
    opacity: 0;
    background-color: rgba(7, 17, 27, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition:all 0.5s;
}
</style>
