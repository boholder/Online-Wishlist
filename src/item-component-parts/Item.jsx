import React from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    ButtonGroup, InputAdornment, Link,
    TextField,
    Tooltip, Typography
} from "@material-ui/core";
import {ExpandMore, RemoveShoppingCart} from "@material-ui/icons";
import PurchaseButton from "./purchase-button";

function ItemName(props) {
    return (
        <Link
            id={`wishlist-${props.type}-item-${props.index}-name`}
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

export function ItemPrice(props) {
    return (
        <TextField id={`wishlist-${props.type}-item-${props.index}-price`}
                   label="Price"
                   endAdornment={
                       <InputAdornment position="end">
                           {/*{props.currencyAbbr}*/}
                           {1122}
                       </InputAdornment>}/>
    )
}

function ActionButtonGroup(props) {
    return (
        <ButtonGroup>
            <Tooltip title="buy" arrow>
                <PurchaseButton/>
            </Tooltip>
            <Tooltip title="reject" arrow>
                <Button aria-label="reject"><RemoveShoppingCart/></Button>
            </Tooltip>
        </ButtonGroup>
    );
}

export class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={`wishlist-${this.props.type}-item-${this.props.index}`}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}>
                        <ActionButtonGroup/>
                    </AccordionSummary>
                    <AccordionDetails>bbb</AccordionDetails>
                </Accordion>
            </div>
        );
    }
}