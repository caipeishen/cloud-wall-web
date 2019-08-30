import request from '../utils/request'  
import cfg from '@/config/config'

const ana = { }

// 获取语录信息
ana.getAnaInfo = (param) => {
    return request('post', cfg.apiUrl + 'ana/getAnaInfo',param);
}
// 获取语录集合
ana.getAnaList = (param) => {
    return request('post', cfg.apiUrl + 'ana/getAnaList',param);
}
// 获取该语录的上条语录
ana.getAnaUp = (param) => {
    return request('post', cfg.apiUrl + 'ana/getAnaUp',param);
}
// 获取该语录的下条语录
ana.getAnaDown = (param) => {
    return request('post', cfg.apiUrl + 'ana/getAnaDown',param);
}

export default ana;