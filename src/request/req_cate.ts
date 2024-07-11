import http from "./request";

export type ReqCate = {
  id: number;
  name: string;
}

export type ReqManageCate = {
  id: number;
  name: string;
  count: number;
  created_at: number;
}

export const getCateList = () => {
  return http.get("/category/list");
};

export const getCateManageList = (page: number, pageSize: number) => {
  return http.get("/category/manage/list", { params: { page_num: page, page_size: pageSize } });
}

export const createCate = (name: string) => {
  return http.post("/category/manage/create", { name: name });
}

export const updateCate = (id: number, name: string) => {
  return http.put("/category/manage/update", { id: id, name: name });
}

export const deleteCate = (id: number) => {
  return http.delete(`/category/manage/delete/${id}`);
}


