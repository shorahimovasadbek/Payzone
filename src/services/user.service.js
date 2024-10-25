import { useQuery } from "react-query";
import { requestPayzone } from "./http-client";

const userService = {
    getUser: () => requestPayzone.get("/api/me"),
};


export const useGetUser = () => {
    return useQuery(["GET_STEAMS"], async () => {
        return await userService.getUser();
    });
};