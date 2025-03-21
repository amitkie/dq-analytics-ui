import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkUserLoggedInRequest } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const CheckToken = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("authToken");

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            dispatch(checkUserLoggedInRequest({ navigate, dispatch }));
        } else {
            const urlObject = new URL(window.location.href);
            // Extract the token URL (protocol + hostname + port)
            const tokenUrl = `${urlObject.protocol}//${urlObject.host}/token`;

            window.location.href = `${process.env.REACT_APP_ONBOARDING_PORTAL_FRONTEND_URL}/login?redirect=${tokenUrl}`;
        }
    }, [token, navigate, dispatch]);

    return <div />;
};

export default CheckToken;