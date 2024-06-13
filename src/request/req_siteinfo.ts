import http from "./request"


export const getSiteInfo = () => {
  return http.get('/info/site')
}
export const getSiteBasicInfo = () => {
  return http.get('/info/basic')
}

export const getBadgesInfo = () => {
  return http.get('/info/badges')
}