import request from '../utils/request'  
import cfg from '@/config/config'

const user = {

    // 用户访问
    visit: (param) => {
        return request('get', cfg.apiUrl + 'user/visit',param);
    },
    // 检查用户名是否被注册
    userNameCheckIsRegister: (param) => {
        return request('post', cfg.apiUrl + 'user/userNameCheckIsRegister',param);
    },
    // 用户注册
    userRegister: (param) => {
        return request('post', cfg.apiUrl + 'user/userRegister',param);
    },
    // 用户登陆
    userLogin: (param) => {
        return request('post', cfg.apiUrl + 'user/userLogin',param);
    },
    // 用户修改
    userModify: (param) => {
        return request('post', cfg.apiUrl + 'user/userModify',param);
    }

}

export default user;