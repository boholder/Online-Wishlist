import {Link, Typography} from "@material-ui/core";
import React from "react";

export default function ItemName(props) {
    return (
        <Link href={props.link} target="_blank" rel="noreferrer" color="primary">
            <Typography >
                {props.name}
            </Typography>
        </Link>
    )
}