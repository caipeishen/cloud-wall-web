import {GET_ANA_TYPE_LIST} from './mutationsType'

export default {

    [GET_ANA_TYPE_LIST](state,result){
        state.anaTypeList = result;
    }

}
