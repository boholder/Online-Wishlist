import {Button, Grid, Link} from "@material-ui/core";
import React from "react";
import {GitHub} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    gird: {
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default function Header(props) {
    const classes = useStyles();

    return (
        <div id="header">
            <header>
                <Grid container={true} className={classes.gird}>
                    <h1>Wish List</h1>
                    <Link href="https://material-ui.com/zh/components/links/"
                          rel="noopener">
                        <Button variant="outlined"
                                startIcon={<GitHub/>}>
                            How to use
                        </Button>
                    </Link>
                </Grid>
            </header>
            <p>Wish list application.</p>
        </div>
    )
}