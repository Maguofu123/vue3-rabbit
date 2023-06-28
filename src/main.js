

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/common.scss'

import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局指令

app.directive('img-lazy', {
    mounted(el, binding){
        // el：指令绑定元素
        // binding: bingding.value 表达式的值
        console.log(el ,'|',binding.value)
        useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                if (isIntersecting){
                    el.src = binding.value
                }
            },
          )
    }
})