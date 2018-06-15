<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <div class="price">￥{{minPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay">
                     ￥{{minPrice}}起送
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            minPrice: {
                type: Number,
                default: 0
            },
            deliveryPrice: {
                type: Number,
                default: 0
            }
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

    .logo .icon-shopping_cart{
        font-size: 24px;
        color: #80858a;
        line-height: 44px;
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
         font-size: 12 px;
     }
</style>
