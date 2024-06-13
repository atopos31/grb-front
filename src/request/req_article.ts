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

// Tag interface for the tags used in the object
interface Tag {
    id: number;
    name: string;
}

// Category interface for the category used in the object
interface Category {
    id: number;
    name: string;
}

export interface ArticleItem {
    id: number;
    created_at: string; // ISO 8601 format date
    updated_at: string; // ISO 8601 format date
    uuid: number;
    title: string;
    summary: string;
    content: string;
    cover_image: string;
    views: number;
    status: number;
    top: number;
    category_id: number;
    category: Category;
    tags: Tag[];
}



export const getArticleList = (page: number, pageSize: number) => {
    return http.get("/article/list", { params: { page_num : page, page_size : pageSize } })
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