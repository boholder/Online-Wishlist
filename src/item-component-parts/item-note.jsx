import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    Grid, Popover,
    TextField,
    Tooltip,
    Typography
} from "@material-ui/core";
import {ExpandMore, ThumbDown, ThumbUp} from "@material-ui/icons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    gird: {
        alignItems: 'center',
        justifyItems: 'flex-start',
        padding: theme.spacing(1)
    },
    root: {
        overflow: 'hidden',
    },
    acceptIcon: {
        color: theme.palette.success.dark
    },
    rejectIcon: {
        color: theme.palette.error.dark
    },
    acceptRoot: {
        borderColor: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
    },
    rejectRoot: {
        borderColor: theme.palette.error.dark,
        backgroundColor: theme.palette.error.light,
    }
}));

export default function ItemNote(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const classes = useStyles();
    let icon, rootClass;
    if (props.type === 'accept') {
        icon = (<ThumbUp className={`${classes.acceptIcon}`}/>);
        rootClass = `${classes.root} ${classes.acceptRoot}`;
    } else if (props.type === 'reject') {
        icon = (<ThumbDown className={`${classes.rejectIcon}`}/>);
        rootClass = `${classes.root} ${classes.rejectRoot}`;
    }

    let id = `${props.list}-${props.index}-${props.type}-note`
    return (
        // TODO 用 material-ui-popup-state 替代 https://material-ui.com/zh/components/popover/#popupstate-helper
        <Box>
            <Tooltip title="Click to change" arrow>
                <Card id={id}
                      variant="outlined"
                      onClick={handleClick}
                      className={rootClass}>
                    <Grid container wrap="nowrap" spacing={1} className={classes.gird}>
                        <Grid item>
                            {icon}
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap>
                                我是我aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Tooltip>
            <Popover
                id={`${id}-input`}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                <TextField fullWidth/>
            </Popover>
        </Box>
    );
};