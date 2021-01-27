import axios from 'axios'
import { getAccessToken } from '../helpers/authHeader'

const baseUrl = 'http://localhost:8000/api/users/'

let authorization = null

export const getUsers = () => {
    authorization = getAccessToken()
    const request = axios.get(baseUrl, authorization)
    return request.then(response => response.data)
}

export const createUser = async newUser => {
    authorization = getAccessToken()
    console.log(newUser)
    const userRequest = await axios.post(baseUrl, newUser, authorization)
        .then(userResponse => {
            if (newUser.groups) {
            updateUserGroups(userResponse.data.id, newUser.groups)
                    .then(groupResponse => console.log(groupResponse.errors))
            }
            return userResponse
        })
        .then(userResponse => {
            if (newUser.organizational_unit) {
                updateUserOu(userResponse.data.id, newUser.organizational_unit)
                    .then(ouResponse => console.log(ouResponse.errors))
            }
        })
    return await userRequest
}

export const deleteUser = async id => {
    authorization = getAccessToken()
    const response = await axios.delete(`${baseUrl}${id}/`, authorization)
    console.log(response.data)
    return response.data
}

export const updateUserGroups = async (id, groupId) => {
    authorization = getAccessToken()
    const data = { groups: groupId }
    const response = await axios.post(`${baseUrl}${id}/add_to_group/`, data, authorization)
    console.log(response.data)
    return response.data
}

export const updateUserOu = async (id, ouId) => {
    authorization = getAccessToken()
    const data = { organizational_unit: ouId}
    const response = await axios.post(`${baseUrl}${id}/add_to_ou/`, data, authorization)
    console.log(response.data)
    return response.data
}



