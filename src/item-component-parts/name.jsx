import {Link, TextField, Tooltip} from "@material-ui/core";
import React from "react";

export default function Name(props) {
    const id = `${props.itemId}-name`;
    // TODO 现在的name和link无法通过UI修改。
    return (
        <Tooltip title={props.value}>
            <Link
                id={`${id}-link`}
                href={props.link}
                target="_blank"
                rel="noreferrer"
                color="primary">
                <TextField id={`${id}-input-field`}
                           variant="outlined"
                           label="Name"
                           value={props.value}
                           onChange={props.onChange}/>
            </Link>
        </Tooltip>
    )
}