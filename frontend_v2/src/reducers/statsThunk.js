import customFetch from "../utils/axios";

export const getStatsThunk = async (url, userId) => {
  try {
    const resp = await customFetch.get(url, userId);
    return resp.data;
  } catch (error) {}
};
