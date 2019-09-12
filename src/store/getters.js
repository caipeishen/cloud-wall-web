

export default {
    getUser(state){
        return JSON.parse(localStorage.getItem("userSession"));
    }
}
