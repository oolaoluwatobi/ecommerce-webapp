import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";

const HostLayout = () => {
  const contextObj = useOutletContext()
  console.log(contextObj)
  return (
    <div className="w-full flex flex-col bg-teal500  items-center">
      <div className=" ">
        <div className="flex w-full "></div>
        <Outlet context={contextObj}  />
        Dashboard
      </div>
    </div>
  );
};

export default HostLayout;
