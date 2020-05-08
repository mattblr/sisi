import { createSlice } from "@reduxjs/toolkit";

const charts = createSlice({
  name: "charts",
  initialState: {
    newReports: [],
    newReportsPC: [],
    windowedAverageValue: 6,
    metric: "newReports",
    feature: { type: "cases", color: "#c49600" },
    averageValue: null,
    averageLineOn: true,
  },
  reducers: {
    incrementWindowedAverageValue: (state) => {
      if (state.windowedAverageValue < 12) {
        state.windowedAverageValue++;
      }
    },
    decrementWindowedAverageValue: (state) => {
      if (state.windowedAverageValue > 2) {
        state.windowedAverageValue--;
      }
    },
    setMetric: (state, action) => {
      state.metric = action.payload;
    },
    setNewReports: (state, action) => {
      state.newReports = action.payload;
    },
    setAverageValue: (state, action) => {
      state.averageValue = action.payload;
    },

    setAverageLineOn: (state) => {
      state.averageLineOn = !state.averageLineOn;
    },

    setNewReportsPC: (state, action) => {
      state.newReportsPC = action.payload;
    },
    setFeature: (state, action) => {
      state.feature.type = action.payload;
      switch (action.payload) {
        case "cases":
          state.feature.color = "#c49600";
          break;
        case "deaths":
          state.feature.color = "#c43a31";
          break;
        case "tested":
          state.feature.color = "#409f24";
          break;
      }
    },
  },
});

export const {
  incrementWindowedAverageValue,
  decrementWindowedAverageValue,
  setMetric,
  setNewReports,
  setNewReportsPC,
  setFeature,
  setAverageValue,
  setAverageLineOn,
} = charts.actions;

export default charts.reducer;
