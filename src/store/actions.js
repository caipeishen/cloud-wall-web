import {GET_ANA_LIST} from './mutationsType'
import {GET_ANA_DETAIL} from './mutationsType'
import {GET_ANA_TYPE_LIST} from './mutationsType'

import {getAnaList} from '@/api/ana'
import {getAnaTypeList} from '@/api/anaType'

export default {
  getAnaTypeList({commit}){
    getAnaTypeList().then(res=>{
      commit(GET_ANA_TYPE_LIST,res.data);
    })
  },
  //{anaTypeId,searchName,pageNo,pageSize}
  getAnaList({commit},obj){
    getAnaList(obj).then(res=>{
      commit(GET_ANA_LIST,res.data);
    })
  },




}
