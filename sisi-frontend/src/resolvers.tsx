import { gql } from "apollo-boost";

export const GET_RAWDATA = gql`
  query rawData($pageSize: Int, $pageNumber: Int) {
    rawData(pageSize: $pageSize, pageNumber: $pageNumber) {
      _id
      date
      tested
      cases
      deaths
    }
  }
`;

export const GET_NUMOFRESULTS = gql`
  query {
    noOfResults
  }
`;

export const GET_NEWREPORTSDATA = gql`
  query newReportsData($rollingAverageWindow: Int!) {
    newReportsData(rollingAverageWindow: $rollingAverageWindow) {
      date
      tested {
        value
        windowValue
      }
      cases {
        value
        windowValue
      }
      deaths {
        value
        windowValue
      }
    }
  }
`;

export const GET_NEWREPORTSPERCENTAGECHANGEDATA = gql`
  query newReportsPercentageChangeData($rollingAverageWindow: Int!) {
    newReportsPercentageChangeData(
      rollingAverageWindow: $rollingAverageWindow
    ) {
      date
      tested {
        value
        windowValue
      }
      cases {
        value
        windowValue
      }
      deaths {
        value
        windowValue
      }
    }
  }
`;

export const GET_KPIDATA = gql`
  query {
    kpiData {
      todayTested
      todayCases
      todayDeaths
      deltaTested
      deltaCases
      deltaDeaths
      totalCases
      totalTested
      totalDeaths
    }
  }
`;

export const DELETE_RAWDATA = gql`
  mutation deleteData($reportId: ID!) {
    deleteData(reportId: $reportId)
  }
`;

export const UPDATE_RAWDATA = gql`
  mutation updateData(
    $reportId: ID!
    $date: String!
    $tested: Int!
    $cases: Int!
    $deaths: Int!
  ) {
    updateData(
      reportId: $reportId
      date: $date
      tested: $tested
      cases: $cases
      deaths: $deaths
    ) {
      _id
      date
      tested
      cases
      deaths
    }
  }
`;

export const ADD_RAWDATA = gql`
  mutation addNewData(
    $date: String!
    $tested: Int!
    $cases: Int!
    $deaths: Int!
  ) {
    addNewData(date: $date, tested: $tested, cases: $cases, deaths: $deaths) {
      _id
      date
      tested
      cases
      deaths
    }
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;
