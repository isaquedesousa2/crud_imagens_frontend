import axios from "axios";

const get = async ({ url }) => {
    const options = {
        method: "GET",
        url: url,
    };

    const res = await axios(options);

    return {
        status: res.status,
        data: res.data,
    };
};

const post = async ({ url, data }) => {
    console.log(url, data);
    const options = {
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "multipart/form-data;",
        },
        data: data,
    };

    const res = await axios(options);

    return res;
};

const _delete = async ({ url, data }) => {
    const options = {
        method: "DELETE",
        url: url,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        data: data,
    };

    const res = await axios(options);

    return res;
};

const axiosResquests = {
    get,
    post,
    _delete,
};

export default axiosResquests;
