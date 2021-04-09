import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import {ExpandMore, ThumbDown, ThumbUp} from "@material-ui/icons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

const CustomAccordionSummary = withStyles({
    content: {
        overflow: 'hidden'
    }
})(AccordionSummary)

export default function Note(props) {
    const classes = useStyles();

    let icon, rootClass;
    const typeIsAcceptNote = props.type === 'accept';
    if (typeIsAcceptNote) {
        icon = (<ThumbUp className={classes.acceptIcon}/>);
        rootClass = `${classes.root} ${classes.acceptRoot}`;
    } else {
        icon = (<ThumbDown className={classes.rejectIcon}/>);
        rootClass = `${classes.root} ${classes.rejectRoot}`;
    }

    let id = `${props.itemId}-${props.type}-note`

    const handleChange = (event) => {
        const newValue = event.target.value;
        if (typeIsAcceptNote) {
            props.onChange('acceptNote')(newValue);
        } else {
            props.onChange('rejectNote')(newValue);
        }
    }

    return (
        <Accordion id={id}
                   variant="outlined"
                   className={rootClass}>
            <CustomAccordionSummary expandIcon={<ExpandMore/>}>
                <Grid container
                      wrap='nowrap' spacing={1}
                      alignItems="center" justify="flex-start">
                    <Grid item>
                        {icon}
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography noWrap color="textPrimary">
                            {props.value}
                        </Typography>
                    </Grid>
                </Grid>
            </CustomAccordionSummary>
            <AccordionDetails>
                <TextField id={`${id}-input-field`}
                           value={props.value}
                           onChange={handleChange}
                           fullWidth
                           disabled={props.isProcessed}
                           multiline/>
            </AccordionDetails>
        </Accordion>
    );
};