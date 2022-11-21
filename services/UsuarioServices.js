import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import config from "../util/config"


class UsuarioService {

    async cadastrar(data) {
        return axios({
            url: config.API_URL + "usuario/cadastrar",
            method: "POST",
            timeout: config.TIMIEOUT_REQUEST,
            data: data,
            headers: config.HEADER_REQUEST,
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async login(data) {
        return axios({
            url: config.API_URL + "usuario/login",
            method: "POST",
            timeout: config.TIMIEOUT_REQUEST,
            data: data,
            headers: config.TIMIEOUT_REQUEST
        }).then((response) => {
            AsyncStorage.setItem("TOKEN", response.data.access_token)
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async loginComToken(data) {
        return axios({
            url: config.API_URL + "usuario/login-token",
            method: "POST",
            timeout: config.TIMEOUT_REQUEST,
            data: data,
            headers: config.HEADER_REQUEST
        }).then((response) => {
            if (response.data.access_token) {
                AsyncStorage.setItem("TOKEN", response.data.access_token)
                return Promise.resolve(response)
            } else {
                return Promise.reject(response)
            }
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}

const usuarioService = new UsuarioService()
export default usuarioService