import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import goalsSlice from "./reducers/goalsSlice";
import allArticlesSlice from "./reducers/allArticlesSlice";
import dailyFootprintSlice from "./reducers/dailyFootprintSlice";
import householdFootprintSlice from "./reducers/householdFootprintSlice";
import stats from "./reducers/statsSlice";
import usersSlice from "./reducers/usersSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    articles: allArticlesSlice,
    goals: goalsSlice,
    footprint: dailyFootprintSlice,
    householdFootprint: householdFootprintSlice,
    stats: stats,
    users: usersSlice,
  },
});
