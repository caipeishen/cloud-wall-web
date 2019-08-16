const devUrl = 'http://192.168.2.2:9090/';
const proUrl = 'http://192.168.2.2:9090/';
export default {
  apiUrl: process.env.NODE_ENV === 'production' ? proUrl : devUrl
}
