<template>
    <div class="cartcontrol">
        <transition name="move">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
        </transition>
        <div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart (event) {
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            }
            this.$root.eventHub.$emit('cart.add', event.target);
        },
        decreaseCart () {
            if (this.food.count) {
                this.food.count--;
            }
        }
    }
};
</script>

<style>
    .cartcontrol{
        font-size:0;
    }

    .cart-decrease,
    .cart-add{
        display: inline-block;
        padding: 6px;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0,160,220);
    }

    .cart-count{
        font-size:10px;
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height:  24px;
        text-align: center;
        color: rgb(147,153,159);
    }

    .move-enter-active,
    .move-leave-active{
        transition: all .4s linear;
    }

    .move-enter,
    .move-leave-to{
        opacity: 0;
        transform: translate3D(24px,0,0);
        transform: rotate(180deg);
    }
</style>
