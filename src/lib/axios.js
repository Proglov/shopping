'use client'
import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_BackEnd_API;

export const clientWithoutAuth = axios.create({
    baseURL: `${apiURL}`,
    timeout: 30000,
    withCredentials: true,
    headers: {
        "X-Client-Name": "browser",
        "Accept": "application/json",
    }
});

export const clientWithAuth = axios.create({
    baseURL: `${apiURL}`,
    timeout: 30000,
    withCredentials: true,
    headers: {
        "X-Client-Name": "browser",
        "Accept": "application/json",
        "Authorization": typeof window !== "undefined" ? localStorage.getItem('token') ?? null : null
    }
});
