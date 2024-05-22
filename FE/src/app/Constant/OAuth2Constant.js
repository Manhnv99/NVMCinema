export const API_BASE_URL = import.meta.env.VITE_REACT_APP_BE_DOMAIN
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = import.meta.env.VITE_REACT_APP_FE_DOMAIN + 'oauth2/redirect'

// export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const OAUTH2_GOOGLE_AUTHENTICATION_URL = API_BASE_URL + 'oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;