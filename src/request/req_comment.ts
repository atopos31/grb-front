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

export const createRootComment = (commentForm: FormState, uuid: number | undefined) => {
    return http.post("/comment/create", { article_id: uuid, content: commentForm.content, user_name: commentForm.name, email: commentForm.email, web_site: commentForm.website })
}

export const replyComment = (commentFoem: FormState, replycontent: string, uuid: number | undefined, root_id: number | undefined, parent_id?: number | undefined) => {
    return http.post("/comment/create", { article_id: uuid, content: replycontent, user_name: commentFoem.name, email: commentFoem.email, web_site: commentFoem.website, parent_id: parent_id, root_id: root_id })
}

export interface ChildComment {
    id: number;
    rootId: number | undefined;
    parentId: number | undefined;
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

export interface CommentManager {
    id: number;
    createdAt: string; // Assuming LocalTime is formatted as a string
    content: string;
    email: string;
    userName: string;
    avatar: string;
    web_site: string;
}

export const getCommentList = (uuid: string | undefined) => {
    return http.get(`/comment/list/${uuid}`)
}

export const getCommentListByStatus = (status: number) => {
    return http.get(`/comment/manage/list/${status}`)
}

export const updateComment = (id: string,status:string) => {
    return http.put(`/comment/manage/${id}/${status}`)

}