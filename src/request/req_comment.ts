import http from "./request"


export interface FormState {
    name: string;
    email: string;
    website: string;
    content: string;
    isSave: boolean;
}

export const createRootComment = (commentForm: FormState,uuid: number | undefined) => {
    return http.post("/comment/create", { article_id: uuid, content: commentForm.content, user_name: commentForm.name, email: commentForm.email, web_site: commentForm.website })
}