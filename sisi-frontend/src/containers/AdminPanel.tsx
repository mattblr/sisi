import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_RAWDATA } from "../resolvers";
import Spinner from "../components/Spinner";
import InputForm from "../components/InputForm";
import Pagination from "../components/Pagination";

const AdminPanel = (props: any) => {
  const [showNewButtonWindow, setShowNewButtonWindow] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);

  const [selectedReport, setSelectedReport] = useState({
    reportId: "",
    date: "",
    tested: 0,
    cases: 0,
    deaths: 0,
    type: "",
  });

  const pageSize = 10;

  const { data: rawData, loading } = useQuery(GET_RAWDATA, {
    variables: { pageSize, pageNumber },
  });

  if (loading) return <Spinner />;

  return (
    <>
      <div className="report-data-container">
        <div
          className={
            showNewButtonWindow === false
              ? "report-data-new-button"
              : "report-data-new-button-expanded"
          }
        >
          {showNewButtonWindow === false ? (
            <div
              onClick={() => {
                setShowNewButtonWindow(true);
                setSelectedReport({
                  ...selectedReport,
                  type: "add",
                });
              }}
            >
              Add new data
            </div>
          ) : (
            <InputForm
              setShowNewButtonWindow={setShowNewButtonWindow}
              setSelectedReport={setSelectedReport}
              selectedReport={selectedReport}
            />
          )}
        </div>
        <div className="report-data-container-page">
          <div className="report-data-header">
            <div className="report-data-header-item-date">Date</div>
            <div className="report-data-header-item">Tested</div>
            <div className="report-data-header-item">Cases</div>
            <div className="report-data-header-item">Deaths</div>
            <div className="report-data-header-item-buttons">Actions</div>
          </div>
          {rawData.rawData.map((data: any) => {
            return (
              <div className="report-data-item" key={data._id}>
                <div className="report-data-item-date">{data.date}</div>
                <div className="report-data-item-tested">{data.tested}</div>
                <div className="report-data-item-cases">{data.cases}</div>
                <div className="report-data-item-deaths">{data.deaths}</div>
                <div
                  className="report-data-item-edit-button"
                  onClick={() => {
                    setShowNewButtonWindow(true);
                    setSelectedReport({
                      reportId: data._id,
                      date: data.date,
                      tested: data.tested,
                      cases: data.cases,
                      deaths: data.deaths,
                      type: "update",
                    });
                  }}
                >
                  Edit
                </div>
                <div
                  className="report-data-item-delete-button"
                  onClick={() => {
                    setShowNewButtonWindow(true);
                    setSelectedReport({
                      reportId: data._id,
                      date: data.date,
                      tested: data.tested,
                      cases: data.cases,
                      deaths: data.deaths,
                      type: "delete",
                    });
                  }}
                >
                  Delete
                </div>
              </div>
            );
          })}
          <Pagination
            pageSize={pageSize}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
