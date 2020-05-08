import React from "react";
import { setFeature } from "../features/charts/chartsSlice";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";

import "../App.css";

const Legend = (props: any) => {
  const dispatch = useDispatch();
  const feature = useSelector(
    (state: RootState) => state.chartsSlice.feature.type
  );

  return (
    <>
      <div className="legend">
        <div
          className="legend-item"
          onClick={() => {
            dispatch(setFeature("tested"));
          }}
        >
          <div className="legend-symbols-test">&bull;</div>
          <div
            className={
              feature === "tested" ? "legend-text-selected" : "legend-text"
            }
          >
            Tested
          </div>
        </div>
        <div
          className="legend-item"
          onClick={() => {
            dispatch(setFeature("cases"));
          }}
        >
          <div className="legend-symbols-case">&bull;</div>
          <div
            className={
              feature === "cases" ? "legend-text-selected" : "legend-text"
            }
          >
            {" "}
            Cases
          </div>
        </div>
        <div
          className="legend-item"
          onClick={() => {
            dispatch(setFeature("deaths"));
          }}
        >
          <div className="legend-symbols-death">&bull;</div>
          <div
            className={
              feature === "deaths" ? "legend-text-selected" : "legend-text"
            }
          >
            Deaths
          </div>
        </div>
      </div>
    </>
  );
};

export default Legend;
