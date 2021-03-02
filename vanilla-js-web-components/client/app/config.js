
const dockerized = !(document.location.host.includes('localhost'));
const API_ROOT = dockerized ? "http://api:4000/api" : "http://localhost:4000/api";
export const config = {
    rest_url : API_ROOT
    // rest_url: 'https://conduit.productionready.io/api/'
};
