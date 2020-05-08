import React from "react";

const KPIButton = (props: any) => {
  let content;

  content = props.showKPI === true ? "Chart" : "KPIs";

  return (
    <div className="kpi-button-container">
      <div
        className="kpi-button"
        onClick={() => {
          props.setShowKPI(!props.showKPI);
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default KPIButton;
