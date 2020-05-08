import React from "react";

import { useMutation } from "@apollo/react-hooks";

import { ADD_RAWDATA, DELETE_RAWDATA, UPDATE_RAWDATA } from "../resolvers";
import Spinner from "./Spinner";

const InputForm = (props: any) => {
  const [
    deleteRawData,
    { error: deleteError, loading: deleteLoading },
  ] = useMutation(DELETE_RAWDATA, {
    refetchQueries: ["rawData"],
  });
  const [
    updateRawData,
    { error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_RAWDATA, {
    refetchQueries: ["rawData"],
  });

  const [addRawData, { error: addError, loading: addLoading }] = useMutation(
    ADD_RAWDATA,
    {
      refetchQueries: ["rawData"],
    }
  );

  if (deleteError || updateError || addError)
    return (
      <>
        Error! ${deleteError.message || updateError.message || addError.message}
      </>
    );

  if (deleteLoading || updateLoading || addLoading) return <Spinner />;

  const submitHandler = () => {
    switch (props.selectedReport.type) {
      case "add":
        addRawData({
          variables: {
            date: props.selectedReport.date,
            tested: props.selectedReport.tested,
            cases: props.selectedReport.cases,
            deaths: props.selectedReport.deaths,
          },
        });
        break;
      case "delete":
        deleteRawData({
          variables: { reportId: props.selectedReport.reportId },
        });
        break;
      case "update":
        updateRawData({
          variables: {
            reportId: props.selectedReport.reportId,
            date: props.selectedReport.date,
            tested: props.selectedReport.tested,
            cases: props.selectedReport.cases,
            deaths: props.selectedReport.deaths,
          },
        });

        break;
    }

    props.setSelectedReport({
      reportId: "",
      date: "",
      tested: 0,
      cases: 0,
      deaths: 0,
      type: "",
    });
  };

  return (
    <>
      <div className="input-form-container">
        <div className="input-title-container">
          <div className="input-title">Date</div>
          <input
            className="date-input"
            type="date"
            name="date"
            value={props.selectedReport.date}
            placeholder="Enter date"
            onChange={(e) => {
              props.setSelectedReport({
                ...props.selectedReport,
                date: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <div className="input-form-container">
        <div className="input-title-container">
          <div className="input-title">Tested</div>
          <input
            className="tested-input"
            type="number"
            name="tested"
            placeholder="Tested"
            value={props.selectedReport.tested}
            onChange={(e) => {
              props.setSelectedReport({
                ...props.selectedReport,
                tested: Number(e.target.value),
              });
            }}
          />
        </div>
        <div className="input-title-container">
          <div className="input-title">Cases</div>
          <input
            className="cases-input"
            type="number"
            name="cases"
            value={props.selectedReport.cases}
            placeholder="Cases"
            onChange={(e) => {
              props.setSelectedReport({
                ...props.selectedReport,
                cases: Number(e.target.value),
              });
            }}
          />
        </div>
        <div className="input-title-container">
          <div className="input-title">Deaths</div>
          <input
            className="deaths-input"
            type="number"
            name="deaths"
            placeholder="Deaths"
            value={props.selectedReport.deaths}
            onChange={(e) => {
              props.setSelectedReport({
                ...props.selectedReport,
                deaths: Number(e.target.value),
              });
            }}
          />
        </div>
      </div>
      <div className="input-button-container">
        <div
          onClick={() => {
            props.setShowNewButtonWindow(false);
          }}
        >
          Cancel
        </div>
        <div
          onClick={() => {
            props.setShowNewButtonWindow(false);
            submitHandler();
          }}
        >
          {props.selectedReport.type === "delete" ? (
            <> Delete </>
          ) : (
            <> Submit</>
          )}
        </div>
      </div>
    </>
  );
};

export default InputForm;
