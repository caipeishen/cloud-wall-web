import {GET_ANA_LIST} from './mutationsType'
import {GET_ANA_DETAIL} from './mutationsType'

import {getAnaList} from '@/api/ana'

export default {
  getAnaList({commit},{typeId,searchName,pageNo,pageSize}){
    //发送ajax请求得到anaList
    //将查询到的数据传给mutations
    getAnaList({}).then(res=>{
      commit(GET_ANA_LIST,res.data);
      console.log(res);
    });
  },
  getAnaDetail({commit},{id,lastAna,nextAna}){
    commit(GET_ANA_DETAIL,{id,lastAna,nextAna});
  }
}
