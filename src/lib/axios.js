'use client'
import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_BackEnd_API;

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

typeof window !== "undefined" && localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU0YTU4YjM5ODliMjA4YjRlYzI3ZDUiLCJpYXQiOjE3MTY4MjM0MzUsImV4cCI6MTcxNjkwOTgzNX0.8qZZ1gexGBsM4bjofDN0R36h4rdJSsT3hLSmqb0EjNQ")
export const clientWithAuth = axios.create({
    baseURL: `${apiURL}`,
    timeout: 30000,
    withCredentials: false,
    headers: {
        "X-Client-Name": "browser",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": typeof window !== "undefined" ? localStorage.getItem('token') ?? null : null
    }
});
