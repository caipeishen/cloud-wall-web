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
  getAnaList({commit},{anaTypeId,searchName,pageNo,pageSize}){
    getAnaList({"anaTypeId":anaTypeId,"searchName":searchName,"pageNo":pageNo,"pageSize":pageSize}).then(res=>{
      commit(GET_ANA_LIST,res.data);
    })
  },
  getAnaDetail({commit},{id,lastAna,nextAna}){
    commit(GET_ANA_DETAIL,{id,lastAna,nextAna});
  }
}
