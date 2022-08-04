import axios from "axios";

const lkApi = axios.create({
    baseURL: process.env.REACT_APP_LEGACY_APP_URL || "https://lk.market"
})

export { lkApi };
