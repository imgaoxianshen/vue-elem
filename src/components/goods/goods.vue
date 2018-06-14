<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-bind:key="item.id" v-for="item in goods" class="menu-item">
                    <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li v-for="item in goods" v-bind:key="item.id" class="food-list">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" v-bind:key="food.id" class="food-item">
                            <div class="food-icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="food-content">
                                <h2 class="food-name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="ectra">
                                    <span class="count">月售{{food.sellCount}}</span>
                                    <span class="count">好评率{{food.rating}}</span>
                                </div>
                                 <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const ERR_OK = 0;
    export default{
        data () {
            return {
                goods: []
            };
        },
        props: {
            seller: {
                type: Object
            }
        },
        created () {
            this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];

            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    console.log(this.goods);
                }
            });
        }
    };
</script>

<style>
    .goods{
        display: flex;
        overflow: hidden;
        position: absolute;
        width: 100%;
        top: 174px;
        bottom: 46px;
    }

    .menu-wrapper{
        flex:0 0 80px;
        width: 80px;
        background-color: #f3f5f7;
    }

    .foods-wrapper{
        flex: 1;
    }

    .menu-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        border-bottom: 1px solid rgba(7,17,27,.1);
    }

    .menu-item .icon{
        display: inline-block;
    }

    .menu-item .text{
        width: 56px;
        font-size: 12px;
        font-weight: 500;
    }

    .foods-wrapper .title{
        padding-left:14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color:rgb(147,153,159);
        background-color:#f3f5f7;
    }

    .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        position: relative;
    }

    .food-item:after{
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7,17,27,.1);
        content: " ";
    }

    .food-item:last-child:after{
        display: none;
        margin-bottom: 0;
    }

    .food-icon{
        flex:0 0 57px;
        margin-right: 10px;
    }

    .food-content{
        flex: 1;
    }

    .food-content .food-name{
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color:rgb(7,17,27);
    }

    .desc,
    .extra{
        margin-bottom: 8px;
        font-size: 10px;
        color:rgb(147,153,159);
    }

    .desc{
        margin-bottom: 8px;
    }

    .font-content .extra{
        line-height: 10px;
    }

    .extra .count{
        margin-right: 12px;
    }

    .price{
        font-weight: 700;
        line-height: 24px;
    }

    .price .now{
        margin-right: 8px;
        font-size: 14px;
        color:rgb(240,20,20);
    }

    .price .old{
        text-decoration: line-through;
        color:rgb(147,153,159);
    }
</style>
