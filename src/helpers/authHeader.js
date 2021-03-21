let accessToken = null
let refreshToken = null

export const assignTokens = (tokens) => {
    accessToken = {
            headers: { Authorization: `Bearer ${tokens.access}`}
        }

    refreshToken = {
        body: { refresh: tokens.refresh }
    }  
}

export const removeTokens = () => {
    accessToken = null 
    refreshToken = null
}

export const getAccessToken = () => {
    // console.log('From authHeader.js access ',accessToken)
    return(accessToken)
}

export const getRefreshToken = () => {
    return refreshToken
}

