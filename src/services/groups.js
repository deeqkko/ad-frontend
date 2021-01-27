import axios from 'axios'
import { getAccessToken } from '../helpers/authHeader'
import handleResponse from '../helpers/handleResponse'

const baseUrl = 'http://localhost:8000/api/groups/'

let authorization = null

export const getGroups = async () => {
    authorization = getAccessToken()
    const response = await axios.get(baseUrl, authorization)
    console.log(response)
    const data = handleResponse.handleResponse(response)
    return data
}

export const createGroup = async newGroup => {
    authorization = getAccessToken()
    const response = await axios.post(baseUrl, newGroup, authorization)
    return response.data
}

export const deleteGroup = async id => {
    authorization = getAccessToken()
    const response = await axios.delete(`${baseUrl}${id}/`, authorization)
    console.log(response.data)
    return response.data
}

