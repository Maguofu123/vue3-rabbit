// 封装购物车模块

import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useCartStore = defineStore('cart', () => {
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action - addCart
    const addCart = (goods) => {
        // 添加购物车
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 通过匹配传递过来的商品对象中的skuId能否在cartList中找到
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if(item) {
            item.count++
        }else{
            cartList.value.push(goods)
        }
    }

    // 删除购物车
    const delCart = (skuId) => {
        // 1. 找到下标
        // 2. 数组过滤
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }

    // 计算属性
    // 1. 总的数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count ,0))
    // 2. 总价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price ,0))
    
    
    
    
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice
    }

},{
    persist: true,
})