const devUrl = 'http://114.116.190.45/cloud-wall/';
const proUrl = 'http://114.116.190.45/cloud-wall/';
export default {
  apiUrl: process.env.NODE_ENV === 'production' ? proUrl : devUrl
}
