import axios from 'axios'
import { getAccessToken } from '../helpers/authHeader'
import handleResponse from '../helpers/handleResponse'
const baseUrl = 'http://localhost:8000/api/ou/'

let authorization = null

export const getOus = async () => {
    authorization = getAccessToken()
    const response = await axios.get(baseUrl, authorization)
    console.log(response)
    const data = handleResponse.handleResponse(response)
    return data
}

export const createOu = async newOu => {
    authorization = getAccessToken()
    const response = await axios.post(baseUrl, newOu, authorization)
    return response.data
}

export const deleteOu = async id => {
    authorization = getAccessToken()
    const response = await axios.delete(`${baseUrl}${id}/`, authorization)
    console.log(response.data)
    return response.data
}


