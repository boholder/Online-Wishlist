import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

// base on https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sticky-footer/StickyFooter.js
function Copyright() {
    return (
        <Typography noWrap>
            {'Copyright © '}
            <Link target="_blank"
                  color="inherit"
                  href="https://github.com/boholder">
                Boholder
            </Link>
            {' '}{new Date().getFullYear()}
        </Typography>
    );
}

function Host() {
    return (
        <Typography noWrap>
            {'Hosted by '}
            <Link target="_blank"
                  color="inherit"
                  href="https://pages.github.com"
                  rel="noopener">
                Github Pages
            </Link>
        </Typography>
    )
}

function Power() {
    return (
        <Typography noWrap>
            {'Powered by '}
            <Link target="_blank"
                  color="inherit"
                  href="https://reactjs.org"
                  rel="noopener">
                React
            </Link>
            {' and '}
            <Link target="_blank"
                  color="inherit"
                  href="https://material-ui.com"
                  rel="noopener">
                MATERIAL-UI
            </Link>
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    footer: {
        textAlign: 'center',
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ?
                theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Copyright/>
            <Host/>
            <Power/>
        </footer>
    );
}