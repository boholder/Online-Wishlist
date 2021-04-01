import React from 'react'
import {AppBar, Box, Button, Tab, Tabs, withStyles} from "@material-ui/core";
import {Favorite, RemoveShoppingCart, Reorder, ShoppingCart} from "@material-ui/icons";

const styles = {
    root: {
        flexGrow: 1,
    }
};

function TabPanel(props) {
    return (
        <Box
            id={`wishlist-tab-panel-${props.index}`}
            hidden={props.value !== props.index}
            role="tab-panel"
            aria-labelledby={`wishlist-tab-${props.index}`}>
            {props.value === props.index && (
                <Box p={3}>
                    {props.children}
                </Box>
            )}
        </Box>
    );
}

function tabA11yProps(index) {
    return {
        id: `wishlist-tab-${index}`,
        'aria-controls': `wishlist-tab-panel-${index}`,
    };
}

class WishList extends React.Component {
    constructor(props) {
        super(props);
        const content = props.content;
        this.fixInvalidItems(content.wishlist);
        this.props.content.statistics = this.calculateStatistics(content.wishlist);
        // value for tab switching
        this.state = {value: 0};
        this.handleChange = this.handleChange.bind(this);
    }

    fixInvalidItems(content = {}) {
        [content.open, content.purchased, content.rejected]
            .forEach(this.fixOneList);
    }

    fixOneList(content = []) {
        const patch = {
            state: 'open',
            name: '',
            acceptNote: '',
            price: 0,
            createTime: new Date().toLocaleDateString('en-CA'),
            processTime: ''
        }
        content = content.map(item => {
            if (item.name || item.acceptNote) {
                let newItem = {...patch, ...item};

                const validState = new Set(['open', 'purchased', 'rejected']);
                if (!validState.has(newItem.state)) {
                    newItem.state = 'open';
                } else if (newItem.state === 'rejected' && !newItem.rejectNote) {
                    newItem.rejectNote = '';
                }

                if (isNaN(newItem.price) || newItem.price < 0) {
                    newItem.price = 0;
                }

                return newItem;
            } else {
                return null;
            }
        }).filter(item => item);
    }

    calculateStatistics(wishlist) {
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

    handleChange(event, newValue) {
        this.setState({value: newValue});
    };

    render() {
        return (
            <Box id="wish-list" className={this.props.classes.root}>
                <AppBar position="static">
                    <Tabs value={this.state.value}
                          onChange={this.handleChange}
                          variant="scrollable"
                          scrollButtons="on">
                        <Tab label="Open" icon={<Favorite/>} {...tabA11yProps(0)} />
                        <Tab label="Purchased" icon={<ShoppingCart/>} {...tabA11yProps(1)} />
                        <Tab label="Rejected" icon={<RemoveShoppingCart/>} {...tabA11yProps(2)} />
                        <Tab label="Statistics" icon={<Reorder/>} {...tabA11yProps(3)}/>
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <Button>item1</Button>
                    <Button>item2</Button>
                    <Button>item3</Button>
                    <Button>item4</Button>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    Item Three
                </TabPanel>
            </Box>
        );
    }
}

export default withStyles(styles)(WishList);