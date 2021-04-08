import React from 'react'
import {Card, Divider, Grid, Tooltip, withStyles} from "@material-ui/core";
import Time from "./time";
import Note from "./note";
import ProcessButton from "./process-button";
import Name from "./name";
import Price from "./price";
import {DragHandle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import CryptoJS from "crypto-js";
import LinkButton from "./link-button";

const warpTriggerWidth = '520px';

const styles = theme => ({
    itemGird: {
        padding: theme.spacing(0.8)
    },
    fieldGrid: {
        height: '100%',
        minWidth: warpTriggerWidth,
        marginRight: theme.spacing(0.5),
        marginTop: theme.spacing(0.1),
        marginBottom: theme.spacing(0.1)
    },
    button: {
        height: '100%'
    }
});

const useStyles = makeStyles({
    button: {
        height: '100%'
    }
});

function OpenListButtonGroup(props) {
    const classes = useStyles();
    return (
        <>
            <ProcessButton type="purchase"
                           itemId={props.itemId}
                           onConfirm={props.onPurchaseConfirm}
                           onUndo={props.onPurchaseUndo}
                           className={classes.button}/>
            <Divider orientation="vertical" flexItem/>
            <ProcessButton type="reject"
                           itemId={props.itemId}
                           onConfirm={props.onRejectConfirm}
                           onUndo={props.onRejectUndo}
                           className={classes.button}/>
        </>
    );
}

function RejectListNoteGrid(props) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Note itemId={props.itemId}
                      type="accept"
                      processed={props.isProcessedType}
                      value={props.acceptNote}
                      onChange={props.onChange}/>
            </Grid>
            <Grid item xs={12}>
                <Note itemId={props.itemId}
                      type="reject"
                      processed={props.isProcessedType}
                      value={props.rejectNote}
                      onChange={props.onChange}/>
            </Grid>
        </Grid>
    )
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.buttonPart = null;
        this.notePart = null;
        this.timePart = null;
        this.isProcessedType = props.type === 'purchased' || props.type === 'rejected';
        this.id = `${props.type}-list-item-${props.index}`;
        this.initComponentParts(props);
    }

    static calculateKey(name) {
        const salt = Math.random().toString().slice(2, 10);
        return CryptoJS.MD5(name + salt).toString();
    }

    initComponentParts(props) {
        const id = this.id;
        this.buttonPart =
            <>
                {(props.type === 'open') ?
                    (<OpenListButtonGroup itemId={id}
                                          onPurchaseConfirm={props.onPurchaseConfirm}
                                          onRejectConfirm={props.onRejectConfirm}
                                          onPurchaseUndo={props.onPurchaseUndo}
                                          onRejectUndo={props.onRejectUndo}/>) :
                    (<ProcessButton type="putback"
                                    itemId={id}
                                    onConfirm={props.onPutBackConfirm}
                                    onUndo={props.onPutBackUndo}
                                    className={props.classes.button}/>)}
                <Divider orientation="vertical" flexItem/>
                <LinkButton itemId={id}
                            value={props.link}
                            onChange={props.onChange}/>
            </>;

        this.timePart = (<>
            <Time type="create"
                  value={props.createTime}
                  itemId={id}/>
            {this.isProcessedType && (
                <Time type="process"
                      value={props.processTime}
                      itemId={id}/>)}
        </>);

        this.notePart = (props.type === 'rejected') ?
            (<RejectListNoteGrid itemId={id}
                                 acceptNote={props.acceptNote}
                                 rejectNote={props.rejectNote}
                                 onChange={props.onChange}
                                 processed={this.isProcessedType}/>) :
            (<Note type="accept"
                   itemId={id}
                   value={props.acceptNote}
                   onChange={props.onChange}
                   processed={this.isProcessedType}/>);
    }

    render() {
        const props = this.props;
        const id = this.id;
        return (
            <Card key={`${props.key}`}
                  id={id}
                  variant="outlined">
                <Grid container
                      alignItems="center"
                      className={props.classes.itemGird}>

                    <Grid item container xs
                          wrap="nowrap"
                          alignItems="center"
                          justify="flex-start"
                          spacing={1}
                          className={props.classes.fieldGrid}>
                        {this.buttonPart}
                        <Name itemId={id}
                              name={props.name}
                              processed={this.isProcessedType}
                              onChange={props.onChange}/>
                        <Price itemId={id}
                               processed={this.isProcessedType}
                               value={props.price}
                               onChange={props.onChange}/>
                        {this.timePart}
                    </Grid>

                    <Grid item container xs
                          wrap="nowrap"
                          alignItems="center">
                        <Grid item xs>
                            {this.notePart}
                        </Grid>
                        <Grid item>
                            <Tooltip title="hold and drag" arrow>
                                <DragHandle fontSize="large"/>
                            </Tooltip>
                        </Grid>
                    </Grid>

                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles)(Item);