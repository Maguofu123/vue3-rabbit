// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install (app) {
        // 逻辑
        app.directive('img-lazy', {
            mounted(el, binding){
                // el：指令绑定元素
                // binding: bingding.value 表达式的值
                const {stop} = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        if (isIntersecting){
                            el.src = binding.value
                            stop()
                        }
                    },
                  )
            }
        })
    }
}