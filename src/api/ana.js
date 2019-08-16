import request from '../utils/request'  
import cfg from '@/config/config'

// 获取语录集合
export const getAnaList = (param) => {
    return request('post', cfg.apiUrl + 'ana/getAnaList',param);
}
// 获取该语录的上条语录
export const getAnaUp = (param) => {
    return request('post', cfg.apiUrl + 'ana/getAnaUp',param);
}
// 获取该语录的下条语录
export const getAnaDown = (param) => {
    return request('post', cfg.apiUrl + 'ana/getAnaDown',param);
}
