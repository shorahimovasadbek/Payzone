import { useQuery } from "react-query";
import { requestPayzone } from "./http-client";

const testimonialsService = {
  getFeedbacks: () =>
    requestPayzone.get("/api/reviews"),
};

export const useGetFeedbacks = () => {
  return useQuery(["GET_REVIEWS"], async () => {
    return await testimonialsService.getFeedbacks();
  });
};