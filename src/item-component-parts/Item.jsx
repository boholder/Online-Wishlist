import React from 'react'
import {Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Tooltip} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import PurchaseButton from "./purchase-button";
import RejectButton from "./reject-button";

function ActionButtonGroup(props) {
    return (
        <ButtonGroup>
            <Tooltip title="buy" arrow>
                <PurchaseButton/>
            </Tooltip>
            <Tooltip title="reject" arrow>
                <RejectButton/>
            </Tooltip>
        </ButtonGroup>
    );
}

export class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(prop, event) {
        this.setState({[prop]: event.target.value});
    };

    handlePriceChange(event, newValue) {

    }

    render() {
        return (
            <div id={`${this.props.type}-item-${this.props.index}`}>
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