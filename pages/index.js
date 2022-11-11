import { useRouter } from "next/router";
import { useEffect } from "react";
import { checkToken } from "../helpers/checkToken";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        router.push("/dashboard");
    }, []);

    return <></>;
}

export const getServerSideProps = async (context) => checkToken(context);
