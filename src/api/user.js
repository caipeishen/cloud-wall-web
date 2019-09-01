import request from '../utils/request'  
import cfg from '@/config/config'

const user = { }

// 用户访问
user.visit = () => {
    return request('post', cfg.apiUrl + 'user/visit');
}
// 检查用户名是否被注册
user.userNameCheckIsRegister = (param) => {
    return request('post', cfg.apiUrl + 'user/userNameCheckIsRegister',param);
}
// 用户注册
user.userRegister = (param) => {
    return request('post', cfg.apiUrl + 'user/userRegister',param);
}
// 用户登陆
user.userLogin = (param) => {
    return request('post', cfg.apiUrl + 'user/userLogin',param);
}
// 用户登陆
user.userModify = (param) => {
    return request('post', cfg.apiUrl + 'user/userModify',param);
}
// 用户点赞
user.userPrize = (param) => {
    return request('post', cfg.apiUrl + 'user/userPrize',param);
}
// 批量点赞（用于用户登录的时候，把点赞的数据保存到数据库中）
user.userPrizeList = (param) => {
    return request('post', cfg.apiUrl + 'user/userPrizeList',param);
}

export default user;