import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'api', // Backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
