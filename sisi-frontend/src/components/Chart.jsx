import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { scaleTime, scaleLinear, scaleBand } from "@vx/scale";
import { AreaClosed, Bar, Line } from "@vx/shape";

import { Tooltip, TooltipWithBounds } from "@vx/tooltip";
import { curveMonotoneX } from "@vx/curve";
import { GridRows, GridColumns } from "@vx/grid";
import { extent, max, bisector } from "d3-array";
import { localPoint } from "@vx/event";
import { timeFormat } from "d3-time-format";
import { timeParse } from "d3";
import { setAverageValue } from "../features/charts/chartsSlice";

const Chart = (props) => {
  const metric = useSelector((state) => state.chartsSlice.metric);
  const feature = useSelector((state) => state.chartsSlice.feature);

  const newReports = useSelector((state) => state.chartsSlice.newReports);

  const averageLineOn = useSelector((state) => state.chartsSlice.averageLineOn);

  const newReportsPC = useSelector((state) => state.chartsSlice.newReportsPC);
  let chartData = metric === "newReports" ? newReports : newReportsPC;

  const [tooltipData, setTooltipData] = useState("");
  const [tooltipTop, setTooltipTop] = useState("");
  const [tooltipLeft, setTooltipLeft] = useState("");
  const [visibleTooltip, setVisibleTooltip] = useState(false);

  const dispatch = useDispatch();

  let tooltipText = "";

  const handleNaN = (num) => {
    return isNaN(num) ? 0 : num;
  };

  if (
    metric === "newReportsPercentageChange" ||
    metric === "windowedAveragePercentageChange"
  ) {
    tooltipText = "% difference";
  } else if (
    metric === "newReports" ||
    metric === "windowedAverageNewReports"
  ) {
    tooltipText = " new reports";
  } else if (metric === "rawData") {
    tooltipText = " total";
  }

  const { width, height } = props;
  if (width < 10) return null;

  const formatDate = timeFormat("%b %d, '%y");
  let data;

  if (feature.type === "tested") {
    data = chartData.map((res) => {
      return {
        date: Number(timeParse("%Y-%m-%d")(res.date)),
        value: handleNaN(Number(res.tested.value)),
        WAValue: handleNaN(Number(res.tested.windowValue)),
      };
    });
  }

  if (feature.type === "cases") {
    data = chartData.map((res) => {
      return {
        date: Number(timeParse("%Y-%m-%d")(res.date)),
        value: handleNaN(Number(res.cases.value)),
        WAValue: handleNaN(Number(res.cases.windowValue)),
      };
    });
  }

  if (feature.type === "deaths") {
    data = chartData.map((res) => {
      return {
        date: Number(timeParse("%Y-%m-%d")(res.date)),
        value: handleNaN(Number(res.deaths.value)),
        WAValue: handleNaN(Number(res.deaths.windowValue)),
      };
    });
  }

  data.filter((d) => {
    return d.value || d.WAValue > 0;
  });

  const ySelector = (data) => {
    return Number(data.value);
  };
  const xSelector = (data) => {
    return new Date(data.date);
  };
  const zSelector = (data) => {
    return Number(data.WAValue);
  };

  const bisectDate = bisector((d) => new Date(d.date)).left;

  const xMax = width;
  const yMax = height;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, xSelector),
  });

  const xScaleBand = scaleBand({
    range: [0, xMax],
    domain: data.map(xSelector),
    padding: 0.2,
  });

  const dataMax = max(data, ySelector);

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, dataMax + dataMax / 3],
    // domain: [0, Math.max(...data.map(ySelector))],
    nice: true,
  });

  const zScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, dataMax + dataMax / 3],
    // domain: [0, Math.max(...data.map(ySelector))],
    nice: true,
  });

  const handleTooltip = ({ event, data, xSelector, xScale, yScale }) => {
    setVisibleTooltip(true);
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index];
    const d1 = data[index - 1];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xSelector(d0.date) < xSelector(d1.date) - x0 ? d1 : d0;
    }

    setTooltipData(d);
    setTooltipLeft(x);
    setTooltipTop(yScale(d.value));

    dispatch(setAverageValue(zSelector(tooltipData)));
  };

  return (
    <div>
      <svg width={width} height={height} className="chart-svg-area">
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="rgba(255,255,255,0.3)"
          //   rx={14}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={feature.color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={feature.color} stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <GridRows
          lineStyle={{ pointerEvents: "none" }}
          scale={yScale}
          width={xMax}
          strokeDasharray="2,2"
          stroke="#282c3433"
        />
        <GridColumns
          lineStyle={{ pointerEvents: "none" }}
          scale={xScale}
          height={yMax}
          strokeDasharray="2,2"
          stroke="#282c3433"
        />
        {data.map((d, i) => {
          const key = xSelector(d);
          const barWidth = xScaleBand.bandwidth();
          const barHeight = yMax - yScale(ySelector(d));
          const barX = xScale(xSelector(d));
          const barY = yMax - barHeight;
          return (
            <Bar
              key={key}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              stroke={"url(#gradient)"}
              fill={"url(#gradient)"}
            />
          );
        })}
        {averageLineOn === true ? (
          <AreaClosed
            data={data}
            x={(d) => xScale(xSelector(d))}
            y={(d) => zScale(zSelector(d))}
            yScale={yScale}
            strokeWidth={3}
            stroke={feature.color}
            fill="#00000030"
            curve={curveMonotoneX}
          />
        ) : (
          <></>
        )}
        <Bar
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
          rx={14}
          data={data}
          onTouchStart={(event) =>
            handleTooltip({
              event,
              xSelector,
              xScale,
              yScale,
              data: data,
            })
          }
          onTouchMove={(event) =>
            handleTooltip({
              event,
              xSelector,
              xScale,
              yScale,
              data: data,
            })
          }
          onMouseMove={(event) =>
            handleTooltip({
              event,
              xSelector,
              xScale,
              yScale,
              data: data,
            })
          }
          onMouseLeave={(event) => {
            setVisibleTooltip(false);
            dispatch(setAverageValue(null));
          }}
        />
        {visibleTooltip === true && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: yMax }}
              stroke={feature.color}
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
              strokeDasharray="2,2"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop + 1}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill={feature.color}
              stroke="white"
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
            />
          </g>
        )}
      </svg>
      {visibleTooltip === true && (
        <div>
          <TooltipWithBounds
            top={tooltipTop - 6}
            left={tooltipLeft + 12}
            style={{
              backgroundColor: feature.color,
              color: "white",
            }}
          >
            {`${ySelector(tooltipData)}${tooltipText}`}
          </TooltipWithBounds>
          <Tooltip
            // top={yMax - 14}
            left={
              tooltipLeft +
              window.scrollX +
              document.querySelector(".vx-bar").getBoundingClientRect().left
            }
            style={{
              transform: "translateX(-50%)",
            }}
          >
            {formatDate(xSelector(tooltipData))}
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Chart;
