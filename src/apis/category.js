import requset from '@/utils/http'

export const getCategoryAPI = (id) => {
    return requset({
        url: '/category',
        params: {
            id
        }
    })
}