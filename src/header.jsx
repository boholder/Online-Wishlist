import {Box, Button, Container, Grid, Link, Typography} from "@material-ui/core";
import React from "react";
import {GitHub} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(3, 2),
        marginBottom: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function Header() {
    const classes = useStyles();
    return (
        <header className={classes.header}>
            <Grid container
                  alignItems="flex-start"
                  justify="space-between">
                <Typography variant="h4" noWrap>Online Wish List</Typography>
                <Link target="_blank"
                      href="https://material-ui.com/zh/components/links/"
                      rel="noopener">
                    <Button variant="outlined"
                            startIcon={<GitHub/>}>
                        How to use
                    </Button>
                </Link>
            </Grid>
            <Typography noWrap>An online wishlist application.</Typography>
        </header>
    )
}