import {Link, Typography} from "@material-ui/core";
import React from "react";

export default function ItemName(props) {
    return (
        <Link
            id={`${props.type}-item-${props.index}-name`}
            href={props.link}
            target="_blank"
            rel="noreferrer"
            color="primary">
            <Typography>
                {props.name}
            </Typography>
        </Link>
    )
}