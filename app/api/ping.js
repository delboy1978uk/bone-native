import apiClient from './client'

const endpoint = '/ping';

const ping = () => apiClient.get(endpoint);

export default {
    ping
}
