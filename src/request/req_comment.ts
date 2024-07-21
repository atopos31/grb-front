import http from "./request"


export interface FormState {
    name: string;
    email: string;
    website: string;
    content: string;
    isSave: boolean;
    parent_id: number | undefined;
    root_id: number | undefined
}

export const createRootComment = (commentForm: FormState,uuid: number | undefined) => {
    return http.post("/comment/create", { article_id: uuid, content: commentForm.content, user_name: commentForm.name, email: commentForm.email, web_site: commentForm.website })
}

export interface ChildComment {
    id: number;
    parentId: number | null;
    content: string;
    userName: string;
    avatar: string;
    email: string;
    web_site: string;
    createdAt: number;
}

export interface AComment {
    id: number;
    content: string;
    userName: string;
    avatar: string;
    email: string;
    web_site: string;
    createdAt: number;
    child_comment: ChildComment[];
}
export const getCommentList = (uuid: string | undefined)=> {
    return http.get(`/comment/list/${uuid}`)
}