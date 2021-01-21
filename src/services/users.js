import axios from 'axios'
import authHeader from '../helpers/authHeader'
import handleResponse from '../helpers/handleResponse'

const baseUrl = 'http://localhost:8000/api/users/'

let authorization = null

const getAll = async () => {
    authorization = authHeader.getAccessToken()
    const response = await axios.get(baseUrl, authorization)
    console.log(response)
    const data = handleResponse.handleResponse(response)
    return data
}

const createUser = async newDomain => {
    authorization = authHeader.getAccessToken()
    const response = await axios.post(baseUrl, newDomain, authorization)
    return response.data
}

const deleteUser = async id => {
    authorization = authHeader.getAccessToken()
    const response = await axios.delete(`${baseUrl}${id}/`, authorization)
    console.log(response.data)
    return response.data
}

export default { getAll, createUser, deleteUser }