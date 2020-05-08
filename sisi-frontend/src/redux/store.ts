import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import chartsSlice from "../features/charts/chartsSlice";

import kpiSlice from "../features/kpi/kpiSlice";

const store = configureStore({
  reducer: { authSlice, chartsSlice, kpiSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
