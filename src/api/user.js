import request from '../utils/request'  
import cfg from '@/config/config'

// 用户注册
export const userRegister = (param) => {
    return request('post', cfg.apiUrl + 'user/userRegister',param);
}
// 用户注册
export const userLogin = (param) => {
    return request('post', cfg.apiUrl + 'user/userLogin',param);
}