import React from "react"
import numeral from "numeral"
import { Circle, Popup} from "react-leaflet"

// Dictionary with 3 keys - for displaying circlets for cases, recovered, and deaths
const casesTypeColors = {
  cases: {
    multiplier: 200,
    option: { color:"#ffc107", fillColor: "#ffc107" },   
  },
  recovered: {
    multiplier: 350,
    option: { color:"#7dd71d", fillColor: "#7dd71d" },
  },
  deaths: {
    multiplier: 1000,
    option: { color:"#cc1034", fillColor: "#cc1034" },
  },
};

// Sort the countries based on highest cases
export const sortData = (data) => {

    const sortedData = [...data];

    // loop trhough entire list
    // run comparison for every two items
    // based on sorting condition

    sortedData.sort((a, b) => {
        if(a.cases > b.cases) {
            return -1;
        } else {
            return +1;
        }
    })

    return sortedData;
};

export const prettyPrintStat = (stat) => 
   stat ?  `+${numeral(stat).format("0.0a")}` : "+0";


// Draw circles on the map with the interactive pop-up
export const showDataOnMap = (data, casesType) => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={casesTypeColors[casesType].option}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag" 
                        style={{ backgroundImage: `url(${country.countryInfo.flag})`}}
                    />
                    <div className="info-country-name">{country.country}</div>
                    <div className="info-confirmed">
                        Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ))
);