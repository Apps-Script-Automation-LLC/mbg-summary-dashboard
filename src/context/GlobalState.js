import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const googleScriptRun = () => {
  return Object.keys(google.script.run).reduce((gs, k) => {
    gs[k] = (...args) => {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler(resolve)
          .withFailureHandler(reject)
          [k].apply(google.script.run, args)
      })
    }
    return gs
  }, {})
}

const initialState = {
  jobListData: [],
  headers: [],
  isDarkTheme: false,
  loading: true,
  error: false,
  estimator: '',
  company: '',
  year: ''
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const updateTheme = (isTheme) => {
    dispatch({
      type: "SWITCH_THEME",
      payload: isTheme
    })
  }

  const fetchData = () => {
    dispatch({
      type: "LOADING",
    });
    googleScriptRun()
      .fetchJobList()
      .then((result) => {
        dispatch({
          type: "FETCH_DATA",
          payload: result,
        });
      })
      .then(() => {
        dispatch({
          type: "STOP_LOADING"
        })
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
  
  const updateEstimator = (estimator) => {
    dispatch({
      type: "UPDATE_ESTIMATOR",
      payload: estimator,
    });
  }

  const updateCompany = (company) => {
    dispatch({
      type: "UPDATE_COMPANY",
      payload: company,
    });
  }

  const updateYear = (year) => {
    dispatch({
      type: "UPDATE_YEAR",
      payload: year,
    });
  }
  
  return (
    <GlobalContext.Provider
      value={{
        isDarkTheme: state.isDarkTheme,
        jobListData: state.jobListData,
        headers: state.headers,
        loading: state.loading,
        error: state.error,
        estimator: state.estimator,
        company: state.company,
        year: state.year,
        fetchData,
        updateTheme,
        updateEstimator,
        updateCompany,
        updateYear
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
