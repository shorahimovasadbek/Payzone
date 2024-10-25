import { useQuery } from "react-query";
import { requestPayzone } from "./http-client";

const eventsService = {
  getEvents: () =>
    requestPayzone.get("/Events"),
};

export const useGetEvents = () => {
  return useQuery(["GET_EVENTS"], async () => {
    return await eventsService.getEvents();
  });
};