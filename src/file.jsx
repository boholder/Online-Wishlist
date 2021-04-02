import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid, Typography} from "@material-ui/core";
import {GetApp, Publish} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    button: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    rootGird: {
        height: '100px'
    },
    buttonGrid: {
        width: '100%',
        height: '100%',
    }
}))

function FileDropZone(props) {
    const classes = useStyles();

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted.');
            reader.onerror = () => console.log('file reading has failed.');
            reader.onload = () => {
                props.onUpload(reader.result);
            }
            reader.readAsText(file);
        })
    }, [props])

    let options = {
        onDrop,
        maxFiles: 1,
        accept: 'application/json'
    };
    const {getRootProps, getInputProps, fileRejections, isDragActive} = useDropzone(options);

    return (
        <Button id="upload-file-button"
                variant="outlined"
                disableTouchRipple
                startIcon={<Publish/>}
                className={classes.button}
                {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography>
                {isDragActive ?
                    'Release to begin parsing' :
                    fileRejections.length ?
                        'Only accept json type files' :
                        'Drop or click to select dumped data file(*.json)'
                }
            </Typography>
        </Button>
    );
}

function FileDownloadButton(props) {
    const classes = useStyles();
    return (
        <Button id="download-file-button"
                variant="outlined"
                startIcon={<GetApp/>}
                className={classes.button}
                onClick={props.onDownload}
                disableTouchRipple>
            <Typography>
                dump and download current wishlist
            </Typography>
        </Button>
    )
}

export default function FileComponent(props) {
    const classes = useStyles();
    return (
        <Grid container
              justify="space-evenly"
              alignItems="center"
              className={classes.rootGird}>
            <Grid item xs className={classes.buttonGrid}>
                <FileDropZone onUpload={props.onUpload}/>
            </Grid>
            <Grid item xs className={classes.buttonGrid}>
                <FileDownloadButton onDownload={props.onDownload}/>
            </Grid>
        </Grid>
    )
}