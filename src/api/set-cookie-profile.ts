import Cookies from "js-cookie"
export async function setCookieProfile( imageProfileUrl: string ){
    Cookies.set('imageProfileUrl-blog-app', imageProfileUrl, { expires: 1 })
}   