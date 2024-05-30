import http from "./request";

export type ReqTag = {
    id: number;
    name: string;
}

export const getTagList = () => {
    return http.get("/tag/list");
}