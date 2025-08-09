import Cookies from "js-cookie"

export async function deleteCookie(){
    Cookies.remove('id-blog-app')
    Cookies.remove('username-blog-app')
    Cookies.remove('imageProfileUrl-blog-app')
    Cookies.remove('token-blog-app')
}  