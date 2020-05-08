import { createSlice } from "@reduxjs/toolkit";

const kpi = createSlice({
  name: "kpi",
  initialState: {
    kpiData: {
      todayTested: 0,
      todayCases: 0,
      todayDeaths: 0,
      deltaTested: 0,
      deltaCases: 0,
      deltaDeaths: 0,
      totalTested: 0,
      totalCases: 0,
      totalDeaths: 0,
    },
  },
  reducers: {
    setKPIData: (state, action) => {
      state.kpiData.todayTested = action.payload.todayTested;
      state.kpiData.todayCases = action.payload.todayCases;
      state.kpiData.todayDeaths = action.payload.todayDeaths;
      state.kpiData.deltaTested = action.payload.deltaTested;
      state.kpiData.deltaCases = action.payload.deltaCases;
      state.kpiData.deltaDeaths = action.payload.deltaDeaths;
      state.kpiData.totalTested = action.payload.totalTested;
      state.kpiData.totalCases = action.payload.totalCases;
      state.kpiData.totalDeaths = action.payload.totalDeaths;
    },
  },
});

export const { setKPIData } = kpi.actions;

export default kpi.reducer;
