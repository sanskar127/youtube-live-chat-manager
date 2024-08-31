import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const [isLoggedin, setIsLoggedin] = useState(false);
const navigate = useNavigate() 

export const handleClick = () => {
    const callbackUrl = `${window.location.origin}/callback`;
    const googleClientId = import.meta.env.VITE_CLIENT_ID
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(callbackUrl)}
    &response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };


//   useEffect(() => {
//     const accessTokenRegex = /access_token=([^&]+)/;
//     const isMatch = window.location.href.match(accessTokenRegex);

//     if (isMatch) {
//       const accessToken = isMatch[1];
//       localStorage.setItem("access_token", accessToken);
//       setIsLoggedin(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (isLoggedin) {
//       navigate("/secure");
//     }
//   }, [isLoggedin, navigate]);