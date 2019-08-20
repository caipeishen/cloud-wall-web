import request from '../utils/request'  
import cfg from '@/config/config'

// 检查用户名是否被注册
export const userNameCheckIsRegister = (param) => {
    return request('post', cfg.apiUrl + 'user/userNameCheckIsRegister',param);
}
// 用户注册
export const userRegister = (param) => {
    return request('post', cfg.apiUrl + 'user/userRegister',param);
}
// 用户登陆
export const userLogin = (param) => {
    return request('post', cfg.apiUrl + 'user/userLogin',param);
}