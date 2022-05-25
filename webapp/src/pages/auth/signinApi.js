
import axios from 'axios'

export function signin(username, password) {
    return axios.get(`/users?username=${username}&password=${password}&roleState=true&_expand=role`)
}