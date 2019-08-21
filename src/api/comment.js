import request from '../utils/request'  
import cfg from '@/config/config'

const comment = { }

// 获取评论集合
comment.getCommentList = (param) => {
    return request('post', cfg.apiUrl + 'comment/getCommentList',param);
}
// 添加评论
comment.addComment = (param) => {
    return request('post', cfg.apiUrl + 'comment/addComment',param);
}

export default comment;