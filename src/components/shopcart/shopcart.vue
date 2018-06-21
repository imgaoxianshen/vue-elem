<template>
<div>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">
                        {{totalCount}}
                    </div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass" @click.stop.prevent="pay">
                    {{payDesc}}
                </div>
            </div>
            <div class="ball-container">
                <div class="ball" v-bind:key="ball.id" v-for="ball in balls" v-show="ball.show"></div>
            </div>
        </div>
        <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listcontent">
                        <ul>
                            <li class="food" v-bind:key="food.id" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="aprice">
                                    <span>￥{{food.price * food.count}}</span>
                                </div>
                                <div class="acartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
        </transition>
    </div>
    <transition name="fade">
    <div class="list-mask" @click="toggleList" v-show="listShow">
    </div>
    </transition>
</div>
</template>

<script type="text/ecmascript-6">
    import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
    import BScroll from 'better-scroll';
    export default{
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [];
                }
            },
            minPrice: {
                type: Number,
                default: 0
            },
            deliveryPrice: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }
                ],
                dropBalls: [

                ],
                fold: true
            };
        },
        computed: {
            totalPrice () {
                let total = 0;
                this.selectFoods.forEach(food => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount () {
                let count = 0;
                this.selectFoods.forEach(food => {
                    count += food.count;
                });
                return count;
            },
            payDesc () {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            payClass () {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough';
                } else {
                    return 'enough';
                }
            },
            listShow () {
                if (this.fold) {
                    return false;
                }
                if (this.totalCount > 0) {
                    if (!this.scroll) {
                        this.$nextTick(() => {
                            this.scroll = new BScroll(this.$refs.listcontent, {
                                click: true
                            });
                        });
                    } else {
                        this.scroll.refresh();
                    }
                    return true;
                }
                return false;
                }
        },
        methods: {
            drop (el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            toggleList () {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty () {
                this.selectFoods.forEach(food => {
                    food.count = 0;
                });
            },
            pay () {
                if (this.totalPrice < this.minPrice) {
                    return;
                }
                window.alert('支付' + this.totalPrice + "元");
            }
        },
        components: {
            cartcontrol
        }
    };
</script>

<style>
    .shopcart{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
        background-color: #141d27;
    }

    .shopcart .content{
        display: flex;
        font-size: 0;
    }

    .shopcart .content-left{
        flex:1;
    }

    .content-left .logo-wrapper{
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color:#141d27;
    }

    .logo-wrapper .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background:rgba(255,255,255,.2);
        text-align: center;
    }

    .logo-wrapper .num{
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        background-color: rgb(240,20,20);
        box-shadow: 0px 4px 8px 0 rgba(0,0,0,.4);
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 400;
        color: white;
    }

    .logo .icon-shopping_cart{
        font-size: 24px;
        color: #80858a;
        line-height: 44px;
    }

    .icon-shopping_cart.highlight{
        color:#fff;
    }

    .logo.highlight{
        background-color: rgb(0,160,220);
    }

    .content-left .price{
        display: inline-block;
        font-size: 16px;
        vertical-align: top;
        margin-top: 12px;
        box-sizing: border-box;
        padding-right: 12px;
        border-right: 1px solid rgba(255,255,255,.1);
        font-weight: 700;
        color:rgba(255,255,255,.4);
    }

    .price.highlight{
        color:#fff;
    }

    .content-left .desc{
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
        font-weight: 700;
        color:rgba(255,255,255,.4);
    }

     .shopcart .content-right{
        flex: 0 0 105px;
        width: 105px;
     }

    .content-right .pay{
        color:rgba(255,255,255,.4);
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background:#2b333b;
    }

    .pay.not-enough{
        background: #2b333b;
    }

    .pay.enough{
        background:#00b43c;
        color:#fff;
    }

    .ball-container .ball{
        position:fixed;
        left:32px;
        bottom:22px;
        z-index: 999;
    }

    .drop-enter-active{
        transition: all .5s;
    }

    .shopcart-list{
        position: absolute;
        top:0;
        left: 0;
        z-index:-100;
        width:100%;
        transform: translate3d(0,-100%,0);
        font-size: 0;
        background-color:#fff;
    }

    .fold-enter-active,
    .fold-leave-active{
        transition: all .5s;
    }

    .fold-enter,
    .fold-leave-to{
        transform: translate3d(0,0,0);
    }

    .list-header{
        height: 40px;
        line-height: 40px;
        background-color: #f3f5f7;
        padding: 0 18px;
        border-bottom: 1px solid rgb(7,17,27,.1);
    }

    .list-header .title{
        float: left;
        font-size: 14px;
        color:rgb(7,17,27);
    }

    .list-header .empty{
        float: right;
        font-size: 12px;
        color: rgb(0,160,220);
    }

    .list-content{
        max-height: 217px;
        background: #fff;
        overflow: hidden;
        width: 100%;
    }

    .list-content .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7,17,27,.1);
    }

    .list-content .name{
        line-height: 24px;
        font-size:14px;
        color:egb(7,17,27);
    }

    .list-content .aprice{
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color:rgb(240,20,20);
    }

    .acartcontrol-wrapper{
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    .list-mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        background-color:rgba(7,17,27,.5);
    }
</style>
