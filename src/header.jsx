import {Button, Grid, Link} from "@material-ui/core";
import React from "react";
import {GitHub} from "@material-ui/icons";

export default function Header() {
    return (
        <div id="header">
            <header>
                <Grid container={true}
                      alignItems="center"
                      justify="space-between">
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