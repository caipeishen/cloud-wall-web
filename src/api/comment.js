import request from '../utils/request'  
import cfg from '@/config/config'

// 获取评论集合
export const getCommentList = (param) => {
    return request('post', cfg.apiUrl + 'comment/getCommentList',param);
}
// 添加评论
export const addComment = (param) => {
    return request('post', cfg.apiUrl + 'comment/addComment',param);
}
