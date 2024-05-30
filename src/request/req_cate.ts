import http from "./request";

export type ReqCate = {
  id: number;
  name: string;
}

export const getCateList = () => {
  return http.get("/category/list");
};

