import {TextField, Tooltip} from "@material-ui/core";
import React from "react";

export default function Name(props) {
    const id = `${props.itemId}-name`;

    const handleNameChange = (field) => (event) => {
        props.onChange(field)(event.target.value);
    }

    return (
        <Tooltip title={props.name}>
            <TextField id={`${id}-input-field`}
                       variant="outlined"
                       label="Name"
                       value={props.name}
                       disabled={props.processed}
                       onChange={handleNameChange('name')}
            />
        </Tooltip>
    )
}