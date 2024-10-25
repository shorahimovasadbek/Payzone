import { useQuery } from "react-query";
import { requestPayzone } from "./http-client";

const singleGameSearch = {
  getSearchUc: (word) =>
    requestPayzone.get(`/api/games/1/autofill?title=${word}`),
};

export const useGetUcSearch = (endPoind) => {
  return useQuery(["searchFillUc"], async () => {
    return await singleGameSearch.getSearchUc(endPoind);
  });
};