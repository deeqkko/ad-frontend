let accessToken = null
let refreshToken = null

const setTokens = (tokens) => {
    accessToken = {
            headers: { Authorization: `Bearer ${tokens.access}`}
        }

    refreshToken = {
        body: { Refresh: tokens.refresh }
    }   
}

const removeTokens = () => {
    accessToken = null 
    refreshToken = null
}

const getAccessToken = () => {
    console.log('From authHeader.js ',accessToken)
    return(accessToken)
}

const getRefreshToken = () => {
    return refreshToken
}

export default { setTokens, getAccessToken, getRefreshToken, removeTokens }