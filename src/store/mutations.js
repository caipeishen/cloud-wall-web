import {GET_ANA_LIST} from './mutationsType'
import {GET_ANA_DETAIL} from './mutationsType'

export default {

    [GET_ANA_LIST](state,{pageNo,pageSize,total,list}){
        console.log(pageNo+" "+pageSize+" "+total+" "+list);
        state.anaList = list
    },
    [GET_ANA_DETAIL](state,{id,lastAna,nextAna}){
        state.anaDetail = state.anaList.find(ana => ana.id == id)
        state.lastAna = lastAna
        state.nextAna = nextAna
        
    }
  
}
