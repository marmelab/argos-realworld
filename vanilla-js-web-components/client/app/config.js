
const API_HOSTNAME = document.location.host.includes('localhost') ? 'localhost': 'api';
const API_ROOT = `http://${API_HOSTNAME}:4000/api`;
export const config = {
    rest_url : API_ROOT
    // rest_url: 'https://conduit.productionready.io/api/'
};
