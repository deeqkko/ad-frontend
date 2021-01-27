import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/token/'

export const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}
