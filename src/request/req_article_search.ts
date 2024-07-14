import http from "./request";

export interface SearchHit {
    uuid: number;
    title: string;
    summary: string;
    content: string;
}

export interface SearchResults {
    hits: SearchHit[];
    total: number;
    processingTimeMs: number;
}

export const searchArticle = (query: string)=> {
    return http.get("/article/search",{params:{query:query}})

}