import {GET_ANA_LIST} from './mutationsType'
import {GET_ANA_TYPE_LIST} from './mutationsType'

export default {

    [GET_ANA_TYPE_LIST](state,result){
        state.anaTypeList = result;
    },
    [GET_ANA_LIST](state,result){
        state.anaData = result;
    }

}
