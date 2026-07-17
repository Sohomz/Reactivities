import axios from 'axios';
import { toast } from 'react-toastify';
import { router } from '../../app/router/routes'; // Adjust path if needed
import { appStore } from '../../app/appStore'; // Adjust path to where your appStore is located
import { isBusy, isIdle } from '../../features/ui/uiSlice'; // Adjust path to your uiSlice

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Request Interceptor: Dispatch isBusy()
agent.interceptors.request.use(config => {
    appStore.dispatch(isBusy());
    return config;
})

// Response Interceptor: Dispatch isIdle() and handle errors
agent.interceptors.response.use(
    async response => {
        await sleep(1000);
        appStore.dispatch(isIdle());
        return response;
    },
    async error => {
        await sleep(1000);
        appStore.dispatch(isIdle()); // Ensure the busy state is reset on error
        
        const { data, status } = error.response;
        
        switch (status) {
            case 400:
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key])
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error('unauthorised');
                break;
            case 403:
                toast.error('forbidden');
                break;
            case 404:
                await router.navigate('/not-found');
                break;
            case 500:
                router.navigate('/server-error', { state: { error: data } })
                break;
        }

        return Promise.reject(error);
    }
);

export default agent;