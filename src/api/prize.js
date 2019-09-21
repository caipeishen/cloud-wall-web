import request from '../utils/request'  
import cfg from '@/config/config'

const prize = {
    
    anaPrizeLogin: (param) => {
        return request('post', cfg.apiUrl + 'prize/anaPrizeLogin',param);
    },
    // 用户点赞：未登录状态
    anaPrizeUnLogin: (param) => {
        return request('post', cfg.apiUrl + 'prize/anaPrizeUnLogin',param);
    },
    // 用户登陆同步本地点赞记录
    userLoginSyncPrizeList: (param) => {
        return request('post', cfg.apiUrl + 'prize/userLoginSyncPrizeList',param);
    }

}

export default prize;