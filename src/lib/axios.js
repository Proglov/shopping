import axios from "axios";

const apiURL = process.env.BackEnd_API;

export const clientWithoutAuth = axios.create({
    baseURL: `${apiURL}`,
    timeout: 30000,
    withCredentials: false,
    headers: {
        "X-Client-Name": "browser",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

export const clientWithAuth = axios.create({
    baseURL: `${apiURL}`,
    timeout: 30000,
    withCredentials: false,
    headers: {
        "X-Client-Name": "browser",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": localStorage.getItem('token') ?? null
    }
});
