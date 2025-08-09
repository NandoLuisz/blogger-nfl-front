import Cookies from "js-cookie"

export async function setCookie( token: string ){
    Cookies.set('token-blog-app', token, { expires: 1 })
}   