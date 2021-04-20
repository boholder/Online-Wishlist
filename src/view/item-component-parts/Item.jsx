import React from 'react'
import {Card, Divider, Grid, Tooltip, withStyles} from "@material-ui/core";
import Time from "./time";
import Note from "./note";
import ProcessButton from "./process-button";
import Name from "./name";
import Price from "./price";
import {DragHandle} from "@material-ui/icons";
import LinkButton from "./link-button";
import {ButtonType, ListName} from "../../business/constants";

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
});

class Item extends React.Component {
    render() {
        const props = this.props;
        let isProcessedType = props.type === 'purchased' || props.type === 'rejected';
        const id = `${props.type}-list-item-${props.index}`;

        let buttonPart = (<>
            {(props.type === 'open') ?
                (<>
                    <ProcessButton type={ButtonType.PURCHASE}
                                   itemId={id}
                                   onConfirm={props.onItemMove}
                                   onUndo={props.onUndoItemMove}/>
                    <Divider orientation="vertical" flexItem/>
                    <ProcessButton type={ButtonType.REJECT}
                                   itemId={id}
                                   onConfirm={props.onItemMove}
                                   onUndo={props.onUndoItemMove}/>
                </>) :
                (<ProcessButton type={ButtonType.PUTBACK}
                                itemId={id}
                                onConfirm={props.onItemMove}
                                onUndo={props.onUndoItemMove}
                                className={props.classes.button}/>)}
            <Divider orientation="vertical" flexItem/>
            <LinkButton itemId={id}
                        value={props.link}
                        onChange={props.onChange}/>
        </>);

        let timePart = (<>
            <Time type="create"
                  value={props.createTime}
                  itemId={id}/>
            {isProcessedType && (
                <Time type="process"
                      value={props.processTime}
                      itemId={id}/>)}
        </>);

        let notePart = (props.type === 'rejected') ?
            (<Grid container>
                <Grid item xs={12}>
                    <Note itemId={id}
                          type="accept"
                          isProcessed={isProcessedType}
                          value={props.acceptNote}
                          onChange={props.onChange}/>
                </Grid>
                <Grid item xs={12}>
                    <Note itemId={id}
                          type="reject"
                          isProcessed={isProcessedType}
                          value={props.rejectNote}
                          onChange={props.onChange}/>
                </Grid>
            </Grid>) :
            (<Note type="accept"
                   itemId={id}
                   value={props.acceptNote}
                   onChange={props.onChange}
                   isProcessed={isProcessedType}/>);

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
                        {buttonPart}
                        <Name itemId={id}
                              name={props.name}
                              isProcessed={isProcessedType}
                              onChange={props.onChange}/>
                        <Price itemId={id}
                               isProcessed={isProcessedType}
                               value={props.price}
                               onChange={props.onChange}/>
                        {timePart}
                    </Grid>

                    <Grid item container xs
                          wrap="nowrap"
                          alignItems="center">
                        <Grid item xs>
                            {notePart}
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