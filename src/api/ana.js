import request from '../utils/request'  
import cfg from '@/config/config'

//根据部门查询人员
export const getAnaList = (param) => {
    return request('post', cfg.apiUrl + 'ana/getAnaList',param);
}
 

