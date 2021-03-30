import React from 'react'
import {Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Card, Divider, Tooltip} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import PurchaseButton from "./purchase-button";
import RejectButton from "./reject-button";
import PutBackButton from "./putback-button";
import ItemTime from "./item-time";
import ItemNote from "./item-note";

function OpenListButtonGroup(props) {
    return (
        <ButtonGroup>
            <Tooltip title="buy" arrow>
                <PurchaseButton list={props.list}
                                index={props.index}
                                onConfirm={props.onPurchaseConfirm}
                                onUndo={props.onPurchaseUndo}
                />
            </Tooltip>
            <Tooltip title="reject" arrow>
                <RejectButton list={props.list}
                              index={props.index}
                              onConfirm={props.onRejectConfirm}
                              onUndo={props.onRejectUndo}/>
            </Tooltip>
        </ButtonGroup>
    );
}

function RejectListNoteGrid(props) {

}

export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.buttonPart = null;
        this.timePart = null;
        this.notePart = null;
        if (props.type === 'open') {
            // TODO unfinished
            this.buttonPart = (
                <OpenListButtonGroup list={props.type}
                                     index={props.index}
                                     onPurchaseConfirm={props.onPurchaseConfirm}
                                     onRejectConfirm={props.onRejectConfirm}
                                     onPurchaseUndo={props.onPurchaseUndo}
                                     onRejectUndo={props.onRejectUndo}
                />);
            this.timePart = (<ItemTime type="create"
                                       value={props.createTime}
                                       list={props.type}
                                       index={props.index}/>);
            this.notePart = (<ItemNote type="accept"
                list={props.type}
            index={props.index}
            value={props.acceptNote}
            onChange={props.onAcceptNoteChange}/>)
        } else if (props.type === 'purchased' || props.type === 'rejected') {
            this.buttonPart = (
                <PutBackButton list={props.type}
                               index={props.index}
                               onConfirm={props.onPutBackConfirm}
                               onUndo={props.onPutBackUndo}/>);
            this.timePart = (
                <div>
                    <ItemTime type="create"
                              value={props.createTime}
                              list={props.type}
                              index={props.index}/>
                    <Divider orientation="vertical" flexItem/>
                    <ItemTime type="process"
                              value={props.processTime}
                              list={props.type}
                              index={props.index}/>
                </div>
            );
        }
    }

    handleChange(prop, event) {
        this.setState({[prop]: event.target.value});
    };

    handlePriceChange(event, newValue) {

    }

    render() {
        return (
            <Card id={`${this.props.type}-item-${this.props.index}`}>
                {this.buttonPart}
                {this.timePart}
            </Card>
        );
    }
}