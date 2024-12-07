import React from "react";
import "./style.css";
import { useCommonContext } from "../../../context/CommonContext";

const Loader = () => {
  const { loading } = useCommonContext();

  return (
    <>
      {loading && (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
