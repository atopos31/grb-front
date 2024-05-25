import http from "./request";

interface ArticleData {
    content: string;
    title: string;
    cover_image: string;
    tags: string[];
    created_at: string;
    status: number;
    top: number;
    category_id: number;
}

export const createArticle = (data: ArticleData) => {
    return http.post("/article/create", data)
}