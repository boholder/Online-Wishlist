import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    Link,
    Menu,
    MenuItem,
    TextField,
    Tooltip
} from "@material-ui/core";
import React, {useState} from "react";
import {Link as LinkIcon} from "@material-ui/icons";
import {bindMenu, bindTrigger, usePopupState,} from 'material-ui-popup-state/hooks'

export default function Name(props) {
    const id = `${props.itemId}-name`;
    const dialogId = `${id}-link-change-dialog`;
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

    const handleFieldChange = (field) => (event) => {
        props.onChange(field)(event.target.value);
    }

    const menu = <Menu {...bindMenu(popupState)}>
        <MenuItem>
            <Link target="_blank"
                  color="inherit"
                  href={props.link}
                  rel="noopener">
                Open
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClickOpen}>Change</MenuItem>
    </Menu>;

    const inputField = <TextField
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
        <DialogTitle id={`${dialogId}-title`}>Change Link</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter a new link to replace old one.
            </DialogContentText>
            {inputField}
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

    const linkButton = (
        <>
            <Tooltip title="Info Link"
                     arrow
                     disableTouchListener>
                <IconButton
                    size="small"
                    {...bindTrigger(popupState)}>
                    <LinkIcon/>
                </IconButton>
            </Tooltip>
            {menu}
            {dialog}
        </>);

    return (
        <Tooltip title={props.value}
                 disableHoverListener>
            <TextField id={`${id}-input-field`}
                       variant="outlined"
                       label="Name"
                       value={props.value}
                       onChange={handleFieldChange('name')}
                       InputProps={{
                           endAdornment:
                               <InputAdornment position="end">
                                   {linkButton}
                               </InputAdornment>,
                       }}
            />
        </Tooltip>
    )
}