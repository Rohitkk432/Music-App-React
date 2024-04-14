import React from 'react';
import "./googlelogin.css";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../methods";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
    let currentUser;

    let navigate = useNavigate();
    const onSuccess = async (res) => {
        const { email } = jwtDecode(res.credential);
        currentUser = email;
        localStorage.setItem("email", currentUser);
        await checkOfUser();
        navigate("/home");
    };
    const onFailure = (res) => {
        console.log(res);
    };

    const checkOfUser = async () => {
        await fetch(`http://localhost:4000/users/${currentUser}`, { method: "GET" })
            .then((resp) => resp.json())
            .then((res) => {
                if (res) {
                    localStorage.setItem("id", res.id);
                } else {
                    registerNewUser(currentUser).then((resp) => {
                        localStorage.setItem("id", resp.id);
                    });
                }
            })
            .catch((err) => {
                if (err.message === "Unexpected end of JSON input") {
                    registerNewUser(currentUser).then((resp) => {
                        localStorage.setItem("id", resp.id);
                    });
                }
            });
    };
    return (
        <div className="login-side">
            <div className="apptext">
                <div className="app-name">Music Pro X</div>
                <div className="makers-org">A DevSoc Project</div>
            </div>
            <div className="logintext">
                <GoogleLogin onSuccess={onSuccess} onError={onFailure} onFailure={onFailure} theme="filled_black" className="google-login" />
            </div>
        </div>
    );
}
export default Login;
