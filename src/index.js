import React from 'react'
import ReactDOM from 'react-dom';
import {FileDropzone} from './file-dropzone'
import WishList from "./wish-list";
import {Container} from "@material-ui/core";
import Header from "./header";
import RejectButton from "./item-component-parts/reject-button";
import ItemName from "./item-component-parts/item-name";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileContent: {
                wishList: props.fileContent.wishList,
                currencyAbbr: props.fileContent.currencyAbbr
            }
        };
        this.handleFile = this.handleFile.bind(this);
    }

    render() {
        return (
            <Container>
                <Header/>
                <FileDropzone
                    onDrop={this.handleFile}/>
                <WishList contents={this.state.fileContent.wishList}
                          currencyAbbr={this.state.fileContent.currencyAbbr}/>
            </Container>
        );
    }

    handleFile(contentString) {
        let contentMap = JSON.parse(contentString)
        this.setState({fileContent: contentMap})
        console.log("file parsed successfully.")
    }
}

// ========================================

const initFileContent = {
    wishList: [
        {
            "state": "open",
            "name": "Ocolos Quest2 VR",
            "price": 2700,
            "createTime": "2021-03-10",
            "processTime": "",
            "note": "To play VR game."
        },
        {
            "state": "purchased",
            "name": "Halikou EDC Bag + COMBOT3000 Molle Parts",
            "price": 550,
            "createTime": "2021-02-13",
            "processTime": "2021-02-27",
            "note": "Need a new bag for daily using."
        },
        {
            "state": "rejected",
            "name": "TechTeddyBear AirBorne ver.",
            "price": 100,
            "createTime": "2021-01-02",
            "processTime": "",
            "note": "Just want one",
            "rejectReason": "Already got a marine ver."
        }
    ],
    currencyAbbr: 'CNY'
};

ReactDOM.render(
    // <App fileContent={initFileContent}/>,
    <ItemName name={"aaa"} link="https://www.baidu.com"/>,
    document.getElementById('root')
);
  