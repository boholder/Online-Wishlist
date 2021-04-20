import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Snackbar,
    TextField,
    Tooltip,
    withStyles
} from "@material-ui/core";
import {Close, Error, RemoveShoppingCart, ShoppingCart, Undo} from "@material-ui/icons";
import {ButtonType, ListName} from "../../business/constants";

const styles = theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
});

function getInitValues(type) {
    let snackbarMsg, dialogMsg, buttonIcon, confirmActionDstList;
    switch (type) {
        case ButtonType.PURCHASE:
            snackbarMsg = 'You confirmed a purchase.';
            dialogMsg = 'Congratulations! Are you sure you want to redeem this wish?';
            buttonIcon = (<ShoppingCart/>);
            confirmActionDstList = ListName.PURCHASED;
            break;
        case ButtonType.REJECT:
            snackbarMsg = 'You confirmed a rejection.';
            dialogMsg = 'Enter the reason of rejection as a reminder for future consideration.';
            buttonIcon = (<RemoveShoppingCart/>);
            confirmActionDstList = ListName.REJECTED;
            break;
        case ButtonType.PUTBACK:
            snackbarMsg = 'You put a processed item back to open list.';
            dialogMsg = 'Are you sure you want to put it back to open list?';
            confirmActionDstList = ListName.OPEN;
            buttonIcon = (<Undo/>);
            break;
        default:
            snackbarMsg = 'wrong button type';
            dialogMsg = 'wrong button type';
            buttonIcon = (<Error/>);
    }
    return [snackbarMsg, dialogMsg, buttonIcon, confirmActionDstList];
}

// TODO 把snakebar提升到app层面，防止调用空指针。
class ProcessButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            emptyInput: false,
            input: '',
            snackBarOpen: false,
            confirmActionDstList: ''
        };

        this.id = `${props.itemId}-${props.type}-button`;
        this.dialogId = `${this.id}-confirm-dialog`;

        this.snackbarMsg = '';
        this.dialogMsg = '';
        this.buttonIcon = null;
        this.confirmActionDstList = '';
        [this.snackbarMsg, this.dialogMsg,
            this.buttonIcon, this.confirmActionDstList] = getInitValues(props.type);
        this.isRejectButton = props.type === 'reject';
        if (this.isRejectButton) {
            this.rejectReasonInputField = React.createRef();
        }
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
        this.submitConfirm = this.submitConfirm.bind(this);
        this.noticeEmptyInput = this.noticeEmptyInput.bind(this);
    }

    handleDialogOpen() {
        this.setState({dialogOpen: true});
    };

    handleDialogClose() {
        this.setState({dialogOpen: false});
    };

    handleSnackBarClose() {
        this.setState({snackBarOpen: false});
    }

    handleInputChange(event) {
        this.setState({input: event.target.value});
    }

    handleDialogConfirm() {
        if (this.isRejectButton) {
            if (this.state.input) {
                this.submitConfirm();
            } else {
                this.noticeEmptyInput();
            }
        } else {
            this.submitConfirm();
        }
    };

    noticeEmptyInput() {
        this.setState({emptyInput: true});
        this.rejectReasonInputField.current.focus();
    }

    submitConfirm() {
        this.setState({dialogOpen: false});
        this.props.onConfirm(this.confirmActionDstList)(this.state.input);
        this.setState({snackBarOpen: true});
    }

    render() {
        const state = this.state;
        const props = this.props;

        const rejectReasonInputField = <TextField
            id={`${this.dialogId}-reason-of-rejection-input-field`}
            autoFocus
            margin="dense"
            required
            type="text"
            fullWidth
            multiline
            error={state.emptyInput}
            helperText={state.emptyInput && "Reason should not be empty."}
            ref={this.rejectReasonInputField}
            onChange={this.handleInputChange}
        />;

        const dialog = <Dialog open={state.dialogOpen}
                               onClose={this.handleDialogClose}
                               aria-labelledby={this.dialogId}>
            <DialogTitle id={`${this.dialogId}-title`}>Confirm</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.dialogMsg}
                </DialogContentText>
                {this.isRejectButton && rejectReasonInputField}
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleDialogClose}>
                    Cancel
                </Button>
                <Button onClick={this.handleDialogConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>;

        const snackbar = <Snackbar
            key={this.snackbarMsg}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={state.snackBarOpen}
            autoHideDuration={6000}
            onClose={this.handleSnackBarClose}
            message={this.snackbarMsg}
            action={
                <React.Fragment>
                    <Button color="secondary" size="small" onClick={props.onUndo}>
                        UNDO
                    </Button>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        className={props.classes.close}
                        onClick={this.handleSnackBarClose}
                    >
                        <Close/>
                    </IconButton>
                </React.Fragment>
            }
        />;

        return (
            <>
                <Tooltip title={props.type}
                         arrow>
                    <IconButton id={this.id}
                                variant="text"
                                onClick={this.handleDialogOpen}
                                aria-label={this.id}
                                className={props.className}>
                        {this.buttonIcon}
                    </IconButton>
                </Tooltip>
                {dialog}
                {snackbar}
            </>
        );
    }
}

export default withStyles(styles)(ProcessButton);