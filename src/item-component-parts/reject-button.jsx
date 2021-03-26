import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {RemoveShoppingCart} from "@material-ui/icons";

export default class RejectButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            emptyInput: false,
            input: ''
        };
        this.id = `wishlist-${props.type}-item-${props.index}-reject-button`;
        this.reasonInput = React.createRef();
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    handleInputChange(event) {
        this.setState({input: event.target.value});
    }

    handleConfirm() {
        if (this.state.input) {
            this.setState({open: false});
            this.props.onConfirm(this.state.input);
        } else {
            this.setState({emptyInput: true});
            this.reasonInput.current.focus();
        }
    };

    render() {
        return (
            <div>
                <Button id={this.id}
                        onClick={this.handleClickOpen}>
                    <RemoveShoppingCart/>
                </Button>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
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
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleConfirm} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
