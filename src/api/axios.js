import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export function getTokenFromCookie() {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? match[2] : null;
}

export const api = axios.create({
    baseURL: API_URL,
    // withCredentials: true,
    xsrfCookieName: null,
    xsrfHeaderName: null,
    headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
        "Content-Type": "application/json",
    },
});

// export { api, getTokenFromCookie };