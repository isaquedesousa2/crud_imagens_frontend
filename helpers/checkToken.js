import { parseCookies } from "nookies";

// FUNCAO QUE VERIFICA SE EXISTE UM TOKEN
export const checkToken = async (context) => {
    const { "auth-token": token } = parseCookies(context);
    if (!token) {
        return {
            redirect: {
                destination: "/auth/login",
                permanet: false,
            },
        };
    }

    return {
        props: {},
    };
};
