// 把components中的所有组件进行全局化注册
// 通过插件的方式
import ImageView from './ImageVIew/index.vue'
import Sku from './XtxSku/index.vue'

export const componentPlugin = {
    install(app) {
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', Sku)
        
    }
}