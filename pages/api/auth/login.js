import axios from "axios";

const LoginRequest = async (req, res) => {
    const options = {
        method: "POST",
        url: "https://faculdade.herokuapp.com/api/v1/auth/login/",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
            email: "teste@gmail.com",
            password: "1",
        },
    };

    const response = await axios(options);

    if (response.status != 200) return res.status(401).send();
    return res.status(200).json({
        data: response.data,
    });
};

export default async function handler(req, res) {
    if (req.method == "POST") {
        LoginRequest(req, res);
    } else {
        res.status(405).send();
    }
}
