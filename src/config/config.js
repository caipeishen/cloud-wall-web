const devUrl = 'http://192.168.2.218:8080/';
const proUrl = 'http://192.168.2.2:8080/';
export default {
  apiUrl: process.env.NODE_ENV === 'production' ? proUrl : devUrl
}
