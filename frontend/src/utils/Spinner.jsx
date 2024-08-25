import React from "react";
import PropagateLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <PropagateLoader className="mx-[50%] mt-60" color={"#E9B824"} size={100} />
  );
};

export default Spinner;
