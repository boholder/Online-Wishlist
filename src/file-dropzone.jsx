import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {makeStyles} from '@material-ui/core/styles';
import {Paper} from "@material-ui/core";

const useStyles = makeStyles({
    inner: {
        minHeight: 100,
        borderWidth: 2
    },
    p: {
        margin: 50,
        textAlign: 'center',
    }
})

export function FileDropzone(props) {
    const classes = useStyles();

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted.');
            reader.onerror = () => console.log('file reading has failed.');
            reader.onload = () => {
                props.onDrop(reader.result);
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
        <div id="file-dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <Paper variant="outlined" className={classes.inner}>
                {isDragActive ?
                    <p className={classes.p}>Release to begin paring.</p> :
                    fileRejections.length ?
                        <p className={classes.p}>Not an acceptable file type, only accept json type.</p> :
                        <p className={classes.p}>Drop configuration file(*.json) here, or click to select one.</p>}
            </Paper>
        </div>
    );
}