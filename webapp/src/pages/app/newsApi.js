import axios from "axios";


export function fetchNews() {
    return axios.get('/news')
}