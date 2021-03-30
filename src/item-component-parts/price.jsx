import NumberFormat from "react-number-format";
import {TextField} from "@material-ui/core";
import React from "react";

function CustomNumberFormat(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix="$"
        />
    );
}

export default function Price(props) {
    let id = `${props.itemId}-price-input-field`;

    return (
        <TextField
            variant="outlined"
            label="Price"
            id={id}
            value={props.value}
            onChange={props.onChange}
            InputProps={{
                inputComponent: CustomNumberFormat,
            }}
        />
    )
}