import axios from 'axios';

export const $serverApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL as string,
});

export const $githubApi = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API_URL as string,
});

$githubApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);
