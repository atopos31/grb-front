import http from "./request"


export const LoginUser = (username: string, password: string)=> {
    return http.post("/user/login",{username:username, password:password} )
}

export const GetUserInfo = () => {
    return http.get("/user/manage/info")
}