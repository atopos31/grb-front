import http from "./request";

export type ReqTag = {
    id: number;
    name: string;
}

export type ReqManageTag = {
    id: number;
    name: string;
    count: number;
    created_at: number;
  }

export const getTagList = () => {
    return http.get("/tag/list");
}

export const getHotTagList = (size:number) => {
    return http.get(`/tag/hotlist/${size}`);
}

export const getTagManageList = (page: number, pageSize: number) => {
    return http.get("/tag/manage/list", { params: { page_num: page, page_size: pageSize } });
  }
  
  export const createTag = (name: string) => {
    return http.post("/tag/manage/create", { name: name });
  }
  
  export const updateTag = (id: number, name: string) => {
    return http.put("/tag/manage/update", { id: id, name: name });
  }
  
  export const deleteTag = (id: number) => {
    return http.delete(`/tag/manage/delete/${id}`);
  }