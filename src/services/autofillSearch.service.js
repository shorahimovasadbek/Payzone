import { useQuery } from "react-query";
import { requestPayzone } from "./http-client";

const singleGameSearch = {
    getSearchAutofill: (word) =>
        requestPayzone.get(`/api/games/autofill?title=${word}`),
};

export const useGetSearchAutofill = (endPoind) => {
    return useQuery(["searchResults"], async () => {
        return await singleGameSearch.getSearchAutofill(endPoind);
    });
};