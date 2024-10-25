import { useQuery } from "react-query";
import { requestPayzone } from "./http-client";

const singleGameSearch = {
  getSearch: (word) =>
    requestPayzone.get(`/api/games?search=${word}`),
};

export const useGetSearch = (endPoind) => {
  return useQuery(["GET_SEARCH"], async () => {
    return await singleGameSearch.getSearch(endPoind);
  });
};