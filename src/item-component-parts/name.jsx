import {Link, TextField} from "@material-ui/core";
import React from "react";

export default function Name(props) {
    const id = `${props.itemId}-name`;
    return (
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
    )
}