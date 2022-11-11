import "../styles/globals.css";
import AuthContext from "../context/AuthContext";

export default function MyApp({ Component, pageProps }) {

    return (
        <AuthContext>
            <Component {...pageProps} />
        </AuthContext>
    );
}
