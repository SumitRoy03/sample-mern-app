import React from "react";
import { Err404 } from "./components/Errors/404/Err404";
import { Err401 } from "./components/Errors/401/Err401";
const Error = ({ errCode }) => {
//   console.log(errCode);
  return (
    <>
      {errCode === 404 && <Err404 />}
      {errCode === 401 && <Err401 />}
    </>
  );
};

export default Error;
