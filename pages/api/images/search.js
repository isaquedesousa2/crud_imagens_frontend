import axios from "axios";

const SearchImages = async (req, res) => {
    const user = req.body.user;

    const response = await axios.get(
        `https://faculdade.herokuapp.com/api/v1/imagens/${user}`
    );

    if (response.status != 200) return res.status(401).send();
    return res.status(200).json({
        data: response.data,
    });
};

export default function handler(req, res) {
    if (req.method == "POST") {
        SearchImages(req, res);
    } else {
        res.status(405).send();
    }
}
