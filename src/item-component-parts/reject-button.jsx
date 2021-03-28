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
    withStyles
} from "@material-ui/core";
import {Close, RemoveShoppingCart} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

class RejectButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            emptyInput: false,
            input: '',
            reject: false
        };
        this.id = `${props.type}-item-${props.index}-reject-button`;
        this.reasonInput = React.createRef();
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleDialogClose() {
        this.setState({open: false});
    };

    handleInputChange(event) {
        this.setState({input: event.target.value});
    }

    handleDialogConfirm() {
        if (this.state.input) {
            this.setState({open: false});
            this.props.onConfirm(this.state.input);
            this.setState({reject: true});
        } else {
            this.setState({emptyInput: true});
            this.reasonInput.current.focus();
        }
    };

    handleSnackBarClose() {
        this.setState({reject: false});
    }

    handleUndo() {
        this.props.onUndo();
    }

    render() {
        const snackbarMsg = 'You confirmed a purchase.';
        return (
            <div>
                <Button id={this.id}
                        onClick={this.handleClickOpen}>
                    <RemoveShoppingCart/>
                </Button>
                <Dialog open={this.state.open}
                        onClose={this.handleDialogClose}
                        aria-labelledby={`${this.id}-confirm-dialog`}>
                    <DialogTitle id="form-dialog-title">Confirm with a reason</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the reason of rejection as a reminder for future consideration.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id={`${this.id}-confirm-dialog-reason-of-rejection-input-field`}
                            label="Reason of rejection"
                            required
                            type="text"
                            fullWidth
                            multiline
                            error={this.state.emptyInput}
                            helperText={this.state.emptyInput && "Reason should not be empty."}
                            ref={this.reasonInput}
                            onChange={this.handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDialogConfirm} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    key={snackbarMsg}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.reject}
                    autoHideDuration={6000}
                    onClose={this.handleSnackBarClose}
                    message={snackbarMsg}
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={this.handleUndo}>
                                UNDO
                            </Button>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                className={this.props.classes.close}
                                onClick={this.handleSnackBarClose}
                            >
                                <Close/>
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
        );
    }
}

export default withStyles(styles)(RejectButton);