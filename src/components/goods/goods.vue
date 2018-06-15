<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWapper">
            <ul>
                <li v-bind:key="item.id" v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
                    <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWapper">
            <ul>
                <li v-for="item in goods" v-bind:key="item.id" class="food-list food-list-hook">
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
                                    <span class="count">好评率{{food.rating}}%</span>
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
        <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/shopcart.vue';
    const ERR_OK = 0;
    export default{
        data () {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0
            };
        },
        props: {
            seller: {
                type: Object
            }
        },
        computed: {
            currentIndex () {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            }
        },
        created () {
            this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];

            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            });
        },
        methods: {
            _initScroll () {
                this.menuScroll = new BScroll(this.$refs.menuWapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWapper, {
                    probeType: 3
                });

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight () {
                let foodList = this.$refs.foodsWapper.getElementsByClassName("food-list-hook");
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu (index, event) {
                if (!event._constructed) {
                    return null;
                }

                let foodList = this.$refs.foodsWapper.getElementsByClassName("food-list-hook");
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            }
        },
        components: {
            shopcart
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

    .current{
        position: relative;
        margin-top: 1px;
        z-index: 10;
        background-color:white;
        font-weight: 700;
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

    .food-item:last-child{
        padding: 0;
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
        line-height: 12px;
        margin-bottom: 8px;
    }

    .font-content .extra{
        line-height: 10px;
    }

    .ectra .count{
        margin-right: 12px;
        color:rgb(147,153,159);
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
