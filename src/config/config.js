const devUrl = 'http://localhost:9090/';
const proUrl = 'http://localhost:9090/';
export default {
  apiUrl: process.env.NODE_ENV === 'production' ? proUrl : devUrl
}
