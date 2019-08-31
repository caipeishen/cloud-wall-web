import {GET_ANA_TYPE_LIST} from './mutationsType'
import anaType from '@/api/anaType'

export default {

  // 获取分类
  getAnaTypeList({commit}){
    anaType.getAnaTypeList().then(res=>{
      commit(GET_ANA_TYPE_LIST,res.data);
    })
  },

  //{anaTypeId,searchName,pageNo,pageSize}
  // getAnaList({commit},obj){
  //   return new Promise((resolve, reject) => { 
  //     ana.getAnaList(obj).then(res=>{
  //       resolve(res);
  //     })
  //   });
  // },




}
