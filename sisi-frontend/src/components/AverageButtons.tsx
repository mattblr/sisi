import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import "../App.css";
import {
  decrementWindowedAverageValue,
  incrementWindowedAverageValue,
  setAverageLineOn,
} from "../features/charts/chartsSlice";

const AverageButtons = (props: any) => {
  const dispatch = useDispatch();

  const windowedAverageValue = useSelector(
    (state: RootState) => state.chartsSlice.windowedAverageValue
  );

  const selectedAverageValue = useSelector(
    (state: RootState) => state.chartsSlice.averageValue
  );

  const metric = useSelector((state: RootState) => state.chartsSlice.metric);

  const averageLineOn = useSelector(
    (state: RootState) => state.chartsSlice.averageLineOn
  );

  return (
    <>
      <div className="button-container-average">
        {averageLineOn === true ? (
          <div className="pm-button-container">
            <div
              className="pm-button"
              onClick={() => dispatch(incrementWindowedAverageValue())}
            >
              +
            </div>
            <div
              className="pm-button"
              onClick={() => dispatch(decrementWindowedAverageValue())}
            >
              -
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="rolling-average-value-text">
          {averageLineOn === true ? (
            <div className="rolling-average-value-text-item">
              {windowedAverageValue} day windowed average
            </div>
          ) : (
            <></>
          )}
          {selectedAverageValue != null && averageLineOn === true ? (
            <div className="rolling-average-value-text-item-value">
              Windowed average value: {selectedAverageValue}
              {metric === "newReportsPercentageChange" ? "%" : ""}
            </div>
          ) : (
            <div
              className="rolling-average-value-text-item-onoff"
              onClick={() => {
                dispatch(setAverageLineOn());
              }}
            >
              Click here to turn the windowed average line
              {averageLineOn === true ? " off" : " on"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AverageButtons;
