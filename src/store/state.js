
export default {
    
    ana:{
        anaTitle:'网易云热评墙'
    },
    user:JSON.parse(sessionStorage.getItem("userSession"))||null,
    anaData:null,
    anaTypeId:0,
    anaTypeList:null,
    prizeList:JSON.parse(localStorage.getItem("prizeList"))||[]
}
