import axios from "axios";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

agent.interceptors.request.use(async config => {
    try {
        await sleep(1000);
        console.log('Request Interceptor');
        return config;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});

export default agent;