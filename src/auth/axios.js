import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://vigilant-youthfulness-production.up.railway.app', // 🔁 замени на свой URL
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default instance;
