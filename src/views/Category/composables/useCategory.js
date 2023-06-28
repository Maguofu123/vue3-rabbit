// 封装分类数据业务相关代码
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { getCategoryAPI } from '@/apis/category';
import { onBeforeRouteUpdate } from 'vue-router';

export function useCategory(){
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => {
        getCategory()
    })
    
    // 在路由参数变化时候， 可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        // 问题：路由参数发生变化了
        getCategory(to.params.id)
      })

    return {
        categoryData
    }
}