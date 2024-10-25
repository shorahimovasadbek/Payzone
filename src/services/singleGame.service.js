import { useQuery } from "react-query";
import { requestPayzone } from "./http-client";

const singleGame = {
  getServices: () =>
    requestPayzone.get("/Services"),
};

export const useGetServices = () => {
  return useQuery(["GET_SERVICES"], async () => {
    return await singleGame.getServices();
  });
};
