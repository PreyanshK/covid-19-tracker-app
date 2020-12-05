import React from "react"
import { Card, CardContent, Typography } from "@material-ui/core"
import "./InfoCard.css"
import numeral from "numeral"

function InfoCard({title, cases, total, active, isCases, isRecovered, isDeaths, ...props}) {
    return (
        <Card 
            onClick={props.onClick} 
            className={`infoCard ${active && "infoCard--selected"} 
                ${isCases && "infoCard--casesSelected"} 
                ${isRecovered && "infoCard--recoveredSelected"} 
                ${isDeaths && "infoCard--deathsSelected"}`    
            }
        >
            <CardContent>
                {/* Title */}
                <Typography className="infoCard__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Daily Cases */}
               {/* <Typography variant="h4" className={`infoCard__cases ${isCases && "infoCard__cases--yellow"} ${isRecovered && "infoCard__recovered--green"}`}>{cases}</Typography>  */}
               <h2 className={`infoCard__cases ${isCases && "infoCard__cases--yellow"} ${isRecovered && "infoCard__recovered--green"}`}>{numeral(cases).format("0,0")}</h2>

                {/*  Total Cases */}
                <Typography className="infoCard__total" color="textSecondary">
                {numeral(total).format("0,0")} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoCard
