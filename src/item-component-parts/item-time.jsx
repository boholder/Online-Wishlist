import {TextField} from "@material-ui/core";
import React from "react";

export default function ItemTime(props) {
    let label, id;
    if (props.type === 'create') {
        label = 'Create Time';
        id = `${props.type}-item-${props.index}-create-time`;
    } else if (props.type === 'process') {
        label = 'Process Time';
        id = `${props.type}-item-${props.index}-process-time`;
    }

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