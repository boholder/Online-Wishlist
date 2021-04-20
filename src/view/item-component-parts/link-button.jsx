import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Link,
    Menu,
    MenuItem,
    TextField,
    Tooltip
} from "@material-ui/core";
import React, {useState} from "react";
import {Link as LinkIcon} from "@material-ui/icons";
import {bindMenu, bindTrigger, usePopupState,} from 'material-ui-popup-state/hooks'

export default function LinkButton(props) {
    const id = `${props.itemId}-link`;
    const dialogId = `${id}-change-dialog`;
    const popupState = usePopupState({variant: 'popover', popupId: `${id}-link-menu`});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDialogConfirm = () => {
        setDialogOpen(false);
        if (input) {
            props.onChange('link')(input);
        }
    };
    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    const menu = <Menu {...bindMenu(popupState)}>
        <MenuItem>
            <Link target="_blank"
                  color="inherit"
                  href={props.value}
                  rel="noopener">
                Open
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClickOpen}>Change</MenuItem>
    </Menu>;

    const dialogInputField = <TextField
        id={`${dialogId}-input-field`}
        autoFocus
        margin="dense"
        type="text"
        fullWidth
        multiline
        autoComplete="off"
        onChange={handleInputChange}
    />;

    const dialog = <Dialog open={dialogOpen}
                           onClose={handleDialogClose}
                           aria-labelledby={dialogId}>
        <DialogTitle id={`${dialogId}-title`}>Change Item Link</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter a new link to replace old one.
            </DialogContentText>
            {dialogInputField}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDialogClose}>
                Cancel
            </Button>
            <Button onClick={handleDialogConfirm}>
                Confirm
            </Button>
        </DialogActions>
    </Dialog>;

    return (<>
        <Tooltip title="info link"
                 arrow
                 disableTouchListener>
            <IconButton
                {...bindTrigger(popupState)}>
                <LinkIcon/>
            </IconButton>
        </Tooltip>
        {menu}
        {dialog}
    </>)
}