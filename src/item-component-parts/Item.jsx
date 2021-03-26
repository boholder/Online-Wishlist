import React from 'react'
import {Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Tooltip} from "@material-ui/core";
import {ExpandMore, RemoveShoppingCart} from "@material-ui/icons";
import PurchaseButton from "./purchase-button";


function ActionButtonGroup(props) {
    return (
        <ButtonGroup>
            <Tooltip title="buy" arrow>
                <PurchaseButton />
            </Tooltip>
            <Tooltip title="reject" arrow>
                <Button aria-label="reject"><RemoveShoppingCart/></Button>
            </Tooltip>
        </ButtonGroup>
    );
}

export default class Item extends React.Component {
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