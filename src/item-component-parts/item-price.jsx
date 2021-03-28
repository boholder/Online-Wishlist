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

export default function ItemPrice(props) {
    let id = `${props.type}-item-${props.index}-price-input-field`;

    return (
        <TextField
            label="Price"
            id={id}
            value={123}
            InputProps={{
                inputComponent: CustomNumberFormat,
            }}
        />
    )
}