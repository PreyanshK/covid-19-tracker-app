import React from 'react'
import "./Table.css"
import numeral from "numeral"

function Table({ casesType, countries}) {
    return (
        <div className="table">
            {/* generate table which contains all countries */}
            {countries.map( ({country, cases, countryInfo}) => (
                <tr>
                    <td>
                        <div className="table__info-flag">
                            <img src={countryInfo.flag } style={{height:"26px",width:"38px"}} />
                        </div>
                    </td>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}
        </div>
    );
}

export default Table
