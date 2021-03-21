import axios from 'axios'
import { getAccessToken, getRefreshToken } from '../helpers/authHeader'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

let authorization = null
let refresh = null

const refreshUrl = 'http://localhost:8000/api/token/refresh/'


// const refreshAuthLogic = (failedRequest) => {
//     axios.post(refreshUrl, refresh.body).then(response => {
//         console.log(response.data)
//         failedRequest.response.config.headers['Authorization'] = 'Bearer ' + response.data.access
//         console.log(failedRequest.response.config.headers)
//         return Promise.resolve()
//     })}


export const get = async (url) => {
    authorization = getAccessToken()
    // refresh = getRefreshToken()
    // createAuthRefreshInterceptor(axios, refreshAuthLogic, { pauseInstanceWhileRefreshing: true })
    const response = await axios.get(url, authorization)
    return response.data
}

export const create = async (url, newObject) => {
    authorization = getAccessToken()
    const response = await axios.post(url, newObject, authorization)
        .then((response) => {
            if (newObject.organizational_unit) {
                console.log('ou', response)
                updateOu(url, response.data.id, newObject.organizational_unit)
                return response
            }
            if (newObject.groups) {
                console.log('groups', response)
                updateGroups(url, response.data.id, newObject.groups)
                return response
            }
            return response
        })
    return response.data
}

export const destroy = async (url, id) => {
    authorization = getAccessToken()
    const response = await axios.delete(`${url}${id}/`, authorization)
    console.log(response.data)
    return response.data
}

export const updateGroups = async (url, id, groupId) => {
    authorization = getAccessToken()
    const data = { groups: groupId }
    const response = await axios.post(`${url}${id}/add_to_group/`, data, authorization)
    console.log('updateGroup', response.data)
    return response.data
}

export const updateOu = async (url, id, ouId) => {
    authorization = getAccessToken()
    const data = { organizational_unit: ouId}
    const response = await axios.post(`${url}${id}/add_to_ou/`, data, authorization)
    console.log('updateOu', response.data)
    return response.data
}

export const removeAllGroups = async (url, id, groupIds) => {
    authorization = getAccessToken()
    console.log(groupIds)
    const data = { groups: groupIds }
    console.log(data)
    const response = await axios.post(`${url}${id}/remove_from_group/`, data, authorization)
    console.log(response.data)
    return response.data
}
