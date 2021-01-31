import axios from 'axios'
import { getAccessToken } from '../helpers/authHeader'

let authorization = null


export const get = async (url) => {
    authorization = getAccessToken()
    const response = await axios.get(url, authorization)
    console.log(response)
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
