import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton,
    Snackbar
} from "@material-ui/core";
import {Close, ShoppingCart} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

export default function PurchaseButton(props) {
    const [open, setOpen] = useState(false);
    const [confirmed, setConfirmed] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleDialogConfirm = () => {
        props.onConfirm();
        setConfirmed(true);
    }

    const handleSnackBarClose = () => {
        setConfirmed(false);
    }

    const id = `${props.list}-item-${props.index}-purchase-button`;
    const classes = useStyles();
    const snackbarMsg = 'You confirmed a purchase.';

    return (
        <div>
            <Button id={id}
                    onClick={handleClickOpen}
                    aria-label={id}>
                <ShoppingCart/>
            </Button>
            <Dialog open={open}
                    onClose={handleDialogClose}
                    aria-labelledby={`${id}-confirm-dialog`}>
                <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Congratulations! Are you sure you want to redeem this wish?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDialogConfirm}>
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
                open={confirmed}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                message={snackbarMsg}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={props.onUndo}>
                            UNDO
                        </Button>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={handleSnackBarClose}
                        >
                            <Close/>
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}