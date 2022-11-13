// SISTEMA PARA REALIZAR AUTENTICACAO

import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";

export const AuthContext = createContext({});

export default function AuthProvider(props) {
    const [user, setUser] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(["auth-token"]);

    // BUSCA O USUARIO PELO COOKIE
    useEffect(() => {
        const userCookies = cookies["auth-token"];
        if (userCookies) {
            setUser(userCookies);
        }
    }, [cookies]);

    // REALIZA O LOGIN DO USUARIO
    async function Login({ email, password }) {
        const options = {
            method: "POST",
            url: "https://faculdade.herokuapp.com/api/v1/auth/login/",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            data: {
                email: email,
                password: password,
            },
        };

        const response = await axios(options)
            .then((res) => {
                if (res.status == 200) {
                    const user = res.data.user;
                    const token = res.data.token;
                    setCookie(
                        "auth-token",
                        JSON.stringify({ user: user, token: token }),
                        {
                            path: "/",
                        }
                    );
                    const userCookies = cookies["auth-token"];
                    setUser(userCookies);
                    Router.push("/dashboard");
                }
            })
            .catch((e) => 401);

        return response;
    }

    // REALIZA O CADASTRO DO USUARIO
    async function register({ email, password }) {
        const options = {
            method: "POST",
            url: "https://faculdade.herokuapp.com/api/v1/auth/register/",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            data: {
                email: email,
                password: password,
            },
        };

        const response = await axios(options)
            .then((response) => {
                if (response.status == 200) {
                    const user = response.data.user;
                    const token = response.data.token;
                    setCookie(
                        "auth-token",
                        JSON.stringify({ user: user, token: token }),
                        {
                            path: "/",
                        }
                    );
                    const userCookies = cookies["auth-token"];
                    setUser(userCookies);
                    Router.push("/dashboard");
                }
            })
            .catch((e) => 401);

        return response;
    }

    return (
        <AuthContext.Provider value={{ user, Login, register }}>
            {props.children}
        </AuthContext.Provider>
    );
}
