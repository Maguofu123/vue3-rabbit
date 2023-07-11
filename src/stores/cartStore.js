// 封装购物车模块

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, findNewCartListAPI} from '@/apis/cart'



export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action - addCart
    const addCart = async (goods) => {

        if (isLogin.value){
            // 登录之后加入购物车逻辑
            await insertCartAPI(goods)
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }else{
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
        
    }

    // 删除购物车
    const delCart = (skuId) => {
        // 1. 找到下标
        // 2. 数组过滤
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
        //通过skuId找到要修改的那一项 把它的selected修改为传过来的selected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    
    
    // 计算属性
    // 1. 总的数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count ,0))
    // 2. 总价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price ,0))
    // 3. 已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count ,0))
    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price ,0))
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    
    // 全选功能
    const allCheck = (selected) => {
        // 把cartList中每一项都设置为当前全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice
    }

},{
    persist: true,
})