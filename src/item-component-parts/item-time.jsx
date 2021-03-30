import {TextField} from "@material-ui/core";
import React from "react";

export default function ItemTime(props) {
    let label;
    if (props.type === 'create') {
        label = 'Create Time';
    } else if (props.type === 'process') {
        label = 'Process Time';
    }
    let id = `${props.list}-item-${props.index}-${props.type}-time`;

    return (
        <TextField
            id={id}
            label={label}
            value={props.value}
            InputProps={{
                readOnly: true,
            }}
        />
    );
}