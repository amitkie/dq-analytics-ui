import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const CheckToken = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("authToken");

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            navigate("/");
        } else {
            const urlObject = new URL(window.location.href);
            // Extract the token URL (protocol + hostname + port)
            const tokenUrl = `${urlObject.protocol}//${urlObject.host}/token`;

            window.location.href = `${process.env.REACT_APP_ONBOARDING_PORTAL_FRONTEND_URL}/login?redirect=${tokenUrl}`;
        }
    }, [token, navigate]);

    return <div />;
};

export default CheckToken;