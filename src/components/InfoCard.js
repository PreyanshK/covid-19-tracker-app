import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"

function InfoCard({title, cases, total}) {
    return (
        <div>
            <Card className="infoCard">
                <CardContent>
                    {/* Title */}
                    <Typography className="infoCard__title" color="textSecondary">
                        {title}
                    </Typography>

                    {/* Daily Cases */}
                    <h2 className="infoCard__cases">{cases}</h2>

                    {/*  Total Cases */}
                    <Typography clasName="infoCard__total" color="textSecondary">
                        {total} in Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoCard
