import {GET_ANALIST} from './mutationsType'
import {GET_ANA_DETAIL} from './mutationsType'

export default {

    [GET_ANALIST](state,{anaList}){
        state.anaList = anaList
    },
    [GET_ANA_DETAIL](state,{id,lastAna,nextAna}){
        state.anaDetail = state.anaList.find(ana => ana.id == id)
        state.lastAna = lastAna
        state.nextAna = nextAna
        
    }
  
}
