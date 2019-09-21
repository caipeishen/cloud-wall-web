import request from '../utils/request'  
import cfg from '@/config/config'

const ana = {

    // 发布语录
    anaPublic: (param) => {
        return request('post', cfg.apiUrl + 'ana/anaPublic',param);
    },
    // 获取语录信息
    getAnaInfo: (param) => {
        return request('post', cfg.apiUrl + 'ana/getAnaInfo',param);
    },
    // 获取语录集合
    getAnaList: (param) => {
        return request('post', cfg.apiUrl + 'ana/getAnaList',param);
    },
    // 获取该语录的上条语录
    getAnaUp: (param) => {
        return request('post', cfg.apiUrl + 'ana/getAnaUp',param);
    },
    // 获取该语录的下条语录
    getAnaDown: (param) => {
        return request('post', cfg.apiUrl + 'ana/getAnaDown',param);
    }

}

export default ana;