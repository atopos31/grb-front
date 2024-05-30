import http from "./request";

export interface ArticleData {
    content: string;
    title: string;
    cover_image: string;
    tags: string[];
    created_at: string;
    status: number;
    top: number;
    category_id: number;
}

export const getArticle = (uuid: string) => {
    return http.get(`/article/get`,{params:{uuid}})
}

export const createArticle = (data: ArticleData) => {
    return http.post("/article/create", data)
}

export const updateArticle = (data: ArticleData,uuid:number) => {
    return http.put(`/article/update/${uuid}`, data)
}