import axios from "axios";
const instance = axios.create({
    baseURL: process.env.telegram_api_url
});

const setMultipart = async ()  => {
    await instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers = {
            'Content-Type': 'multipart/form-data'
        };

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
};

const setJson = async ()  => {
    await instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers = {
            'Content-Type': 'application/json'
        };

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
};


const sendPhoto = async (photo, caption) => {
    await setMultipart();
    const chat_id = `${process.env.telegram_bot_chat_id}`;

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('chat_id', chat_id);
    formData.append('caption', caption);

    // const data = {
    //     chat_id: `${process.env.telegram_bot_chat_id}`,
    //     photo: photo,
    //     caption: caption
    // };
    return instance.post(`/bot${process.env.telegram_bot_auth_token}/sendPhoto`, formData)
};

const sendMessage = async (message) => {
    await setJson();
    const data = {
        chat_id: `${process.env.telegram_bot_chat_id}`,
        text: message,
    };

    return instance.post(`/bot${process.env.telegram_bot_auth_token}/sendMessage`, data)
};





export default {
    sendPhoto,
    sendMessage
}
