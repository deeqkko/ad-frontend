import axios from 'axios'
import { getAccessToken } from '../helpers/authHeader'
import handleResponse from '../helpers/handleResponse'
const baseUrl = 'http://localhost:8000/api/domains/'

let authorization = null

export const getDomains = async () => {
    authorization = getAccessToken()
    const response = await axios.get(baseUrl, authorization)
    console.log(response)
    const data = handleResponse.handleResponse(response)
    return data
}

export const createDomain = async newDomain => {
    authorization = getAccessToken()
    const response = await axios.post(baseUrl, newDomain, authorization)
    return response.data
}

export const deleteDomain = async id => {
    authorization = getAccessToken()
    const response = await axios.delete(`${baseUrl}${id}/`, authorization)
    console.log(response.data)
    return response.data
}

