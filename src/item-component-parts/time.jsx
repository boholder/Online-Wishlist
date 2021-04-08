import {TextField, Tooltip} from "@material-ui/core";
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
        <Tooltip title={props.value}>
            <TextField
                id={id}
                variant="filled"
                label={label}
                disableUnderline
                value={props.value}
                disabled
            />
        </Tooltip>
    );
}