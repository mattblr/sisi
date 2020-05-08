import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useQuery } from "@apollo/react-hooks";

import { GET_KPIDATA } from "../resolvers";
import { setKPIData } from "../features/kpi/kpiSlice";
import Spinner from "./Spinner";

const KPI = (props: any) => {
  const dispatch = useDispatch();
  const { loading } = useQuery(GET_KPIDATA, {
    onCompleted: (d) => {
      dispatch(setKPIData(d.kpiData));
    },
  });

  const kpiData = useSelector((state: RootState) => state.kpiSlice.kpiData);

  let mobileKPICheck = props.mobile === true ? !props.showKPI : props.showKPI;

  return (
    <div
      className={
        props.mobile === true ? "kpi-container-mobile" : "kpi-container"
      }
      onClick={() => {
        props.setShowKPI(mobileKPICheck);
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="kpi-title">Latest figures</div>
          <div className="kpi-new-container">
            <div className="kpi-item">
              {kpiData.todayTested}
              <div
                className={
                  kpiData.deltaTested > 0 ? "kpi-delta-nve" : "kpi-delta-ve"
                }
              >
                {kpiData.deltaTested}
              </div>
            </div>
            <div className="kpi-item">
              {kpiData.todayCases}

              <div
                className={
                  kpiData.deltaCases > 0 ? "kpi-delta-ve" : "kpi-delta-nve"
                }
              >
                {kpiData.deltaCases}
              </div>
            </div>
            <div className="kpi-item">
              {kpiData.todayDeaths}
              <div
                className={
                  kpiData.deltaDeaths > 0 ? "kpi-delta-ve" : "kpi-delta-nve"
                }
              >
                {kpiData.deltaDeaths}
              </div>
            </div>
          </div>
          <>
            {/* <div className="kpi-divider-overlay" /> */}
            <div className="kpi-divider">
              <div className="kpi-divider-item">Tested</div>
              <div className="kpi-divider-item">Cases</div>
              <div className="kpi-divider-item">Deaths</div>
            </div>
          </>
          <div className="kpi-totals-container">
            <div className="kpi-item">{kpiData.totalTested}</div>
            <div className="kpi-item">{kpiData.totalCases}</div>
            <div className="kpi-item">{kpiData.totalDeaths}</div>
          </div>

          <div className="kpi-title">Total figures</div>
        </>
      )}
    </div>
  );
};

export default KPI;
