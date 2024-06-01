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

typeof window !== "undefined" && localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU0YTU4YjM5ODliMjA4YjRlYzI3ZDUiLCJpYXQiOjE3MTcyMjc5MjAsImV4cCI6MTcxNzMxNDMyMH0.-tuvRG7kGhNYedALAeTdImCannOABfmLT_dxPxX3qQg")
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
