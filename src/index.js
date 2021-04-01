import React from 'react'
import ReactDOM from 'react-dom';
import FileComponent from './file'
import WishList from "./wish-list";
import {Container} from "@material-ui/core";
import Header from "./header";
import FileSaver from 'file-saver'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileContent: props.fileContent
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleUpload(content) {
        try {
            this.setState({fileContent: JSON.parse(content)});
            console.log('file-parsing successful.');
        } catch (error) {
            console.error('file-parsing failed: ' + error);
        }
    }

    // https://www.npmjs.com/package/file-saver
    // use Blob type for transferring if possible, or use data:URI
    handleDownload() {
        const date = new Date();
        const dateString = [date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()].join('-');
        let file = new File([JSON.stringify(this.state.fileContent)],
            `wishlist-dump-${dateString}.json`,
            {type: "application/json;charset=utf-8"});
        FileSaver.saveAs(file);
    }

    render() {
        return (<>
                <Header/>
                <Container>
                    <FileComponent onUpload={this.handleUpload}
                                   onDownload={this.handleDownload}/>
                    <WishList content={this.state.fileContent}/>
                </Container>
            </>
        );
    }
}

// ========================================

const exampleFileContent = {
    wishlist: {
        open: [
            {
                "state": "open",
                "name": "Ocolos Quest2 VR",
                "price": 2700,
                "createTime": "2021-03-10",
                "processTime": "",
                "acceptNote": "To play VR game."
            },
            {
                "state": "open",
                "name": "Game: Death Integer",
                "price": 350,
                "createTime": "2021-02-15",
                "processTime": "",
                "acceptNote": "But don't have a good enough GPU to run it."
            },
        ],
        purchased: [
            {
                "state": "purchased",
                "name": "Halikou EDC Bag + COMBOT3000 Molle Parts",
                "price": 550,
                "createTime": "2021-02-13",
                "processTime": "2021-02-27",
                "acceptNote": "Need a new bag for daily using."
            },
        ],
        rejected: [
            {
                "state": "rejected",
                "name": "TechTeddyBear AirBorne ver",
                "price": 100,
                "createTime": "2021-01-02",
                "processTime": "2021-01-27",
                "acceptNote": "Just want one",
                "rejectNote": "Already got a marine ver."
            }
        ]
    },
    statistics: {}
};

ReactDOM.render(
    <App fileContent={exampleFileContent}/>,
    document.getElementById('root')
);
