/**
 * 搜索联想
 */
import request from '@/utils/request'

export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      // 查询搜索的关键词
      q
    }
  })
}

export const getSearchResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

// export const getSearchHistories = () => {
//   return request({
//     method: 'GET',
//     url: '/app/v1_0/search/histories',
//   })
// }