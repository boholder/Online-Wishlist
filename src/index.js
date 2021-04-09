import React from 'react'
import ReactDOM from 'react-dom';
import FileComponent from './file'
import WishList from "./wishlist";
import {CssBaseline} from "@material-ui/core";
import Header from "./header";
import FileSaver from 'file-saver'
import Footer from "./footer";
import BackToTop from "./back-to-top-fab";
import Item from "./item-component-parts/Item";

// TODO PWA未实现
export class App extends React.Component {
    constructor(props) {
        super(props);
        // have to split wishlist to different lists,
        // for react component state updating convenience.
        const wishlist = props.fileContent.wishlist;
        this.state = {};
        Object.keys(wishlist).forEach(key => (this.state[key] = wishlist[key]));
        // do not pass it to child as props, it can't trigger re-render.
        this.jointWishlistFromState = {
            open: this.state.open,
            purchased: this.state.purchased,
            rejected: this.state.rejected
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    // https://www.dropzonejs.com/
    handleUpload(content) {
        try {
            let fileContent = JSON.parse(content);
            if (!fileContent.wishlist) {
                console.error(
                    'file-parsing failed: can\'t find "wishlist" field in file.')
                return;
            }
            let uploadedWishlist = fileContent.wishlist;
            // fix invalid (incomplete fields, invalid values) items
            Object.keys(uploadedWishlist).forEach((key => {
                this.setState({
                    [key]: App.mapFixInvalidItems(uploadedWishlist[key])
                });
            }));
            console.log('file-parsing successful.');
        } catch (error) {
            console.error('file-parsing failed: ' + error);
        }
    }

    static mapFixInvalidItems(list = []) {
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
        // deep copy three item lists, mix them into one list object.
        let wishlistWithOutKey = JSON.parse(JSON.stringify(this.jointWishlistFromState));
        // remove 'key' field in each item,
        // because it's randomly generated for React list sort,
        // it doesn't have reasonable information.
        Object.keys(wishlistWithOutKey).forEach((key => {
            wishlistWithOutKey[key] = App.mapRemoveItemKeys(wishlistWithOutKey[key]);
        }));

        let file = new File(
            [JSON.stringify({wishlist: wishlistWithOutKey})],
            `wishlist-dump-${dateString}.json`,
            {type: "application/json;charset=utf-8"});
        FileSaver.saveAs(file);
    }

    static mapRemoveItemKeys(list) {
        return list.map(element => {
            delete element.key;
            return element;
        });
    }

    handleItemChange(list, index, field, newValue) {
        this.setState({
            [list]: this.state[list].map((item, _index) =>
                (_index === index) ? {...item, [field]: newValue} : item
            )
        });
    };

    render() {
        return (<>
                <CssBaseline/>
                <Header/>
                <FileComponent onUpload={this.handleUpload}
                               onDownload={this.handleDownload}/>
                <WishList open={this.state.open}
                          purchased={this.state.purchased}
                          rejected={this.state.rejected}
                          onChange={this.handleItemChange}/>
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
            "link": "http://example.com",
            "acceptNote": "To play VR game.",
            "price": 2700,
            "createTime": "2021-03-10",
            "processTime": "",
            "rejectNote": "",
            "key": "bzff11597f876e9a0d42c54dd52ae228",
        }, {
            "state": "open",
            "name": "Death Integer",
            "link": "http://example.com",
            "acceptNote": "Want to play, but don't have a good enough GPU to run it.",
            "price": 350,
            "createTime": "2021-02-15",
            "processTime": "",
            "rejectNote": "",
            "key": "bbff11597f876e9a0d4gc54dd52ae227",
        }],
        purchased: [{
            "state": "purchased",
            "name": "Halikou EDC Bag + COMBOT3000 Molle Parts",
            "link": "http://example.com",
            "acceptNote": "Need a new bag for daily using.",
            "price": 550,
            "createTime": "2021-02-13",
            "processTime": "2021-02-27",
            "rejectNote": "",
            "key": "bbff11597f87k3s20d42c54dd52ae227",
        }],
        rejected: [{
            "state": "rejected",
            "name": "TechTeddyBear AirBorne ver",
            "link": "http://example.com",
            "acceptNote": "Just want one",
            "price": 100,
            "createTime": "2021-01-02",
            "processTime": "2021-01-27",
            "rejectNote": "Already got a marine ver.",
            "key": "bbff11597f876e9a0d42c54dd52ae227",
        }]
    }
};

ReactDOM.render(
    <App fileContent={exampleFileContent}/>,
    document.getElementById('root')
);
