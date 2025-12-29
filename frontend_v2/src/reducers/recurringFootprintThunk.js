import customFetch from "../utils/axios";

export const getRecurringFootprintsThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/footprint/recurring");
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || "Failed to fetch recurring footprints");
  }
};

export const addRecurringFootprintThunk = async (recurringFootprint) => {
  try {
    const resp = await customFetch.post("/footprint/recurring", recurringFootprint);
    return resp.data;
  } catch (error) {
    console.error("Add recurring footprint error:", error);
    return Promise.reject(error);
  }
};

export const deleteRecurringFootprintThunk = async (id) => {
  try {
    const resp = await customFetch.delete("/footprint/recurring", {
      data: { id: id },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Delete recurring footprint error:", error);
    return Promise.reject(error);
  }
};

export const toggleRecurringFootprintThunk = async (id) => {
  try {
    const resp = await customFetch.patch(`/footprint/recurring/${id}/toggle`);
    return resp.data;
  } catch (error) {
    console.error("Toggle recurring footprint error:", error);
    return Promise.reject(error);
  }
};

