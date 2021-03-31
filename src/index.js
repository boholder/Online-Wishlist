import React from 'react'
import ReactDOM from 'react-dom';
import File from './file'
import WishList from "./wish-list";
import {Container} from "@material-ui/core";
import Header from "./header";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileContent: {
                wishList: props.fileContent.wishList
            }
        };
        this.handleFile = this.handleFile.bind(this);
    }

    render() {
        return (
            <Container>
                <Header/>
                <WishList contents={this.state.fileContent.wishList}/>
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
        {
            "state": "purchased",
            "name": "Halikou EDC Bag + COMBOT3000 Molle Parts",
            "price": 550,
            "createTime": "2021-02-13",
            "processTime": "2021-02-27",
            "acceptNote": "Need a new bag for daily using."
        },
        {
            "state": "rejected",
            "name": "TechTeddyBear AirBorne ver",
            "price": 100,
            "createTime": "2021-01-02",
            "processTime": "",
            "acceptNote": "Just want one",
            "rejectReason": "Already got a marine ver."
        }
    ]
};

ReactDOM.render(
    // <App fileContent={initFileContent}/>,
    <File/>,
    document.getElementById('root')
);
