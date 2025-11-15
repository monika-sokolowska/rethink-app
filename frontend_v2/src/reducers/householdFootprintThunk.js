import customFetch from "../utils/axios";

export const getHouseholdThunk = async (url, userId) => {
  try {
    const resp = await customFetch.get(url, userId);
    return resp.data;
  } catch (error) {}
};

export const addHouseholdThunk = async (url, footprint) => {
  try {
    const resp = await customFetch.post(url, footprint);
    return resp.data;
  } catch (error) {}
};
