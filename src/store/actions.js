import {GET_ANA_LIST} from './mutationsType'
import {GET_ANA_TYPE_LIST} from './mutationsType'

import ana from '@/api/ana'
import anaType from '@/api/anaType'

export default {
  getAnaTypeList({commit}){
    anaType.getAnaTypeList().then(res=>{
      commit(GET_ANA_TYPE_LIST,res.data);
    })
  },
  //{anaTypeId,searchName,pageNo,pageSize}
  getAnaList({commit},obj){
    return new Promise((resolve, reject) => { 
      ana.getAnaList(obj).then(res=>{
        resolve(res);
      })
    });
    
  },




}
