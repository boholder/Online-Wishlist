import React from 'react'
import ReactDOM from 'react-dom';
import FileComponent from './file'
import WishList from "./wish-list";
import {CssBaseline} from "@material-ui/core";
import Header from "./header";
import FileSaver from 'file-saver'
import Footer from "./footer";
import BackToTop from "./back-to-top-fab";
import Item from "./item-component-parts/Item";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: props.fileContent.wishlist,
            statistics: props.fileContent.statistics
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleUpload(content) {
        try {
            let fileContent = JSON.parse(content);
            if (!fileContent.wishlist) {
                console.error(
                    'file-parsing failed: can\'t find "wishlist" field in file.')
                return;
            }
            let wishlist = fileContent.wishlist;
            const open = App.fixInvalidItems(wishlist.open);
            this.setState({
                wishlist: {
                    open: open,
                    purchased: App.fixInvalidItems(wishlist.purchased),
                    rejected: App.fixInvalidItems(wishlist.rejected)
                },
                statistics: App.calculateStatistics(wishlist)
            })
            console.log('file-parsing successful.');
        } catch (error) {
            console.error('file-parsing failed: ' + error);
        }
    }

    static fixInvalidItems(list = []) {
        const patch = {
            state: 'open',
            name: '',
            link: '',
            price: 0,
            createTime: new Date().toLocaleDateString('en-CA'),
            processTime: '',
            acceptNote: '',
            rejectNote: ''
        }
        const validState = new Set(['open', 'purchased', 'rejected']);

        return list.map(item => {
            if (item.name || item.acceptNote) {
                // use patch to set default value of a valid item
                let newItem = {...patch, ...item};
                if (!validState.has(newItem.state)) {
                    newItem.state = 'open';
                }
                if (isNaN(newItem.price) || newItem.price < 0) {
                    newItem.price = 0;
                }
                newItem.key = Item.calculateKey(newItem.name);
                return newItem;
            } else {
                return null;
            }
        }).filter(item => item); // filter for removing null value items
    }

    static calculateStatistics(wishlist = {}) {
        let cheapest = Number.MAX_VALUE;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let remain = wishlist.open.map((item) => {
            cheapest = cheapest > item.price ? item.price : cheapest;
            return item.price
        }).reduce(reducer, 0);
        let spent = wishlist.purchased.map((item) => {
            return item.price
        }).reduce(reducer, 0);
        let saved = wishlist.rejected.map((item) => {
            return item.price
        }).reduce(reducer, 0);
        return ({
            total: remain + spent + saved,
            remain: remain,
            spent: spent,
            saved: saved,
            cheapest: cheapest
        })

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
        let file = new File([JSON.stringify({
                wishlist: this.state.wishlist,
                statistics: this.state.statistics
            })],
            `wishlist-dump-${dateString}.json`,
            {type: "application/json;charset=utf-8"});
        FileSaver.saveAs(file);
    }

    render() {
        return (<>
                <CssBaseline/>
                <Header/>
                <FileComponent onUpload={this.handleUpload}
                               onDownload={this.handleDownload}/>
                <WishList wishlist={this.state.wishlist}
                          statistics={this.state.statistics}/>
                <BackToTop/>
                <Footer/>
            </>
        );
    }
}

// ========================================

const exampleFileContent = {
    wishlist: {
        open: [{
            "state": "open",
            "name": "Ocolos Quest2 VR",
            "link": "#",
            "acceptNote": "To play VR game.",
            "price": 2700,
            "createTime": "2021-03-10",
            "processTime": "",
            "key": "bac457d09943e0a0640c2e4b2eb3c03a"
        }, {
            "state": "open",
            "name": "Death Integer",
            "link": "#",
            "acceptNote": "But don't have a good enough GPU to run it.",
            "price": 350,
            "createTime": "2021-02-15",
            "processTime": "",
            "key": "20dabb0d13773c16f0cc87138e9fe48e"
        }],
        purchased: [{
            "state": "purchased",
            "name": "Halikou EDC Bag + COMBOT3000 Molle Parts",
            "link": "#",
            "acceptNote": "Need a new bag for daily using.",
            "price": 550,
            "createTime": "2021-02-13",
            "processTime": "2021-02-27",
            "key": "f295399deda3947a31fabc309dadf40e"
        }],
        rejected: [{
            "state": "rejected",
            "name": "TechTeddyBear AirBorne ver",
            "link": "#",
            "acceptNote": "Just want one",
            "price": 100,
            "createTime": "2021-01-02",
            "processTime": "2021-01-27",
            "rejectNote": "Already got a marine ver.",
            "key": "bbff11597f876e9a0d42c54dd52ae227"
        }]
    }, statistics: {
        "total": 3700, "remain": 3050,
        "spent": 550, "saved": 100, "cheapest": 350
    }
};

ReactDOM.render(
    <App fileContent={exampleFileContent}/>,
    document.getElementById('root')
);
