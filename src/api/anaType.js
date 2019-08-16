import request from '../utils/request'  
import cfg from '@/config/config'

 // 查询所有类型
 export const getAnaTypeList = () => {
    return request('post', cfg.apiUrl + 'anaType/getAnaTypeList');
}

