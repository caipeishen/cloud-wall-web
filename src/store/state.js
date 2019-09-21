

export default {
    
    user:JSON.parse(sessionStorage.getItem("userSession")) || null,//解决刷新页面用户丢失问题
    ana:{anaTitle:'网易云热评墙'},
    anaData:null,
    anaTypeId:1,
    anaTypeList:null
}
