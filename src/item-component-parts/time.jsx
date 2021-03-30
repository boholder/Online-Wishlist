import {TextField} from "@material-ui/core";
import React from "react";

export default function Time(props) {
    let label;
    if (props.type === 'create') {
        label = 'Create Time';
    } else if (props.type === 'process') {
        label = 'Process Time';
    }
    let id = `${props.itemId}-${props.type}-time`;

    return (
        <TextField
            id={id}
            variant="outlined"
            label={label}
            value={props.value}
            onChange={props.onChange}
            InputProps={{
                readOnly: true,
            }}
        />
    );
}