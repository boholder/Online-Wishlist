import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";

export default function PurchaseButton(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const id = `wishlist-${props.type}-item-${props.index}-purchase-button`;
    return (
        <div>
            <Button id={id}
                    onClick={handleClickOpen}
                    aria-label={id}>
                <ShoppingCart/>
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby={`${id}-confirm-dialog`}>
                <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Congratulations! Are you sure you want to redeem this wish?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={props.onConfirm}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}