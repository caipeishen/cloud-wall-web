import request from '../utils/request'  
import cfg from '@/config/config'

const anaType = { 
    
    // 查询所有类型
    getAnaTypeList: () => {
        return request('post', cfg.apiUrl + 'anaType/getAnaTypeList');
    }

}

export default anaType;