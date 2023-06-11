import React from 'react';
import Plot from 'react-plotly.js';

const LineGraph = ({data}) => {
  // Sample data
//   const data = [
//     {
//       familyId: "8076794410",
          // x: [1, 2],
          // y: [0.4444444444444444, 0.666]
//     },
//   ];
    console.log("line", data);
  // Layout configuration
  const layout = {
    title: 'MPI IMPROVEMENTS',
    xaxis: {
      title: 'Months',
    },
    yaxis: {
      title: 'MPI Value',
    //   zeroline: false,
    },
  };

  return <Plot data={data} layout={layout} style={{width:"320px", height: "300px"}}/>;
};

export default LineGraph;
