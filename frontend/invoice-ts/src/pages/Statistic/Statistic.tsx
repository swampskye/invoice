// import React from "react";
// import Chart1 from "../../components/Charts/Chart1";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
type Props = {};

// const DemoBar = () => {
//   const data = [
//     {
//       year: "1951 年",
//       value: 38,
//     },
//     {
//       year: "1952 年",
//       value: 52,
//     },
//     {
//       year: "1956 年",
//       value: 61,
//     },
//     {
//       year: "1957 年",
//       value: 145,
//     },
//     {
//       year: "1958 年",
//       value: 48,
//     },
//   ];
//   const config = {
//     data,
//     xField: "value",
//     yField: "year",
//     seriesField: "year",
//     legend: {
//       position: "top-left",
//     },
//   };
//   return <Bar {...config} />;
// };

const DemoBar = () => {
  const data = [
    {
      status: "pending",
      value: 10,
    },
    {
      status: "accepted",
      value: 5,
    },
    {
      status: "rejected",
      value: 1,
    },
  ];
  const config = {
    data,
    xField: "status",
    yField: "value",
    seriesField: "status",
    legend: {
      position: "top-left",
    },
  };
  return <Bar {...config} />;
};

const Statistic = (props: Props) => {
  return (
    <div style={{ height: "600px" }}>
      <h1>Statistic</h1>
      <DemoBar />
    </div>
  );
};

export default Statistic;
