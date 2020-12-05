import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      //  Since the API only has total # of daily cases,
      // We want to display the # of new case per day
      // So we need to take a difference from
      // the last date and current date

      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };

      chartData.push(newDataPoint);
    }

    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

function LineGraph({ casesType = "cases", ...props }) {
  const [data, setData] = useState({});
  const [color, setColor] = useState("rgba(255, 202, 40, 0.5)");
  const [border, setBorder] = useState("rgba(255, 202, 40, 1)");
  
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          //get info and render graph

          const chartData = buildChartData(data, casesType);
          console.log(chartData);
          setData(chartData);
        });
    };

    fetchData();

    if(casesType === "cases") {
      setColor("rgba(255, 202, 40, 0.5)");
      setBorder("rgba(255, 202, 40, 1)");
    } 
    else if(casesType === "recovered") {
      setColor(" rgba(125, 215, 29, 0.5)");
      setBorder("rgba(125, 215, 29, 1)");
    }
    else {
      setColor("rgba(204, 16, 52, 0.5)");
      setBorder("rgba(204, 16, 52, 1)");
    }
  }, [casesType]);

  // ONLY if data exists then render the graph
  //else return undefined
  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: color,
                borderColor: border,
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
