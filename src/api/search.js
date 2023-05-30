/**
 * 用户相关请求模块
 */
import request from "@/utils/request";
/** 
 * 联想建议模块
 */
export const getSearchSuggestions = q => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}
/** 
 * 获取搜索结果模块
 */
export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}