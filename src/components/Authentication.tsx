import React, { useEffect } from "react"
import { useNavigate, redirect } from "react-router-dom"


export const WithAuth = (Component: any) => {
    return function Authenticated(props: any) {
        // const navigate = useNavigate();
        // const token = localStorage.getItem("auth-token")
        // useEffect(() => {
        //     if (!token) {
        //         navigate("/login")
        //     }
        // }, [token])
        return <Component {...props} />
    }
}