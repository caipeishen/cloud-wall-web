const devUrl = 'http://169.254.137.102:9090/';
const proUrl = 'http://114.116.190.45/cloud-wall/';
export default {
  apiUrl: process.env.NODE_ENV === 'production' ? proUrl : devUrl
}
