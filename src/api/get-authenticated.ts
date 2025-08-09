import Cookies from "js-cookie"

export async function getAuthenticated() {
    const token = Cookies.get("token-blog-app");
    if(token){
        return true
    }
    return false
}