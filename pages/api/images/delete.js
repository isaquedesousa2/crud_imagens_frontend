import axios from "axios";

const DeleteImage = async (req, res) => {
    const body = req.body;

    console.log(body);

    const options = {
        method: "DELETE",
        url: "https://faculdade.herokuapp.com/api/v1/imagens/",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
            userId: body.userId,
            id: body.id,
        },
    };

    const response = await axios(options);

    if (response.status != 200) return res.status(401).send();
    return res.status(200).json({
        data: response.data,
    });
};

export default function handler(req, res) {
    if (req.method == "POST") {
        DeleteImage(req, res);
    } else {
        res.status(405).send();
    }
}
