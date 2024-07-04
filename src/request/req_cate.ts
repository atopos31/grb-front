import http from "./request";

export type ReqCate = {
  id: number;
  name: string;
}

export type ReqManageCate = {
  id: number;
  name: string;
  count: number;
}

export const getCateList = () => {
  return http.get("/category/list");
};

export const getCateManageList = () => {
  return http.get("/category/manage/list");
}

