import http from "./request";

export const GetUpToken = ()=>http.get("/oss/uptoken")