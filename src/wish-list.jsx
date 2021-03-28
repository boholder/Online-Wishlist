import React from 'react'
import {AppBar, Box, Button, Container, Tab, Tabs, withStyles} from "@material-ui/core";
import {Favorite, RemoveShoppingCart, Reorder, ShoppingCart} from "@material-ui/icons";

const styles = {
    root: {
        flexGrow: 1,
    }
};

function TabPanel(props) {
    return (
        <div
            id={`wishlist-tab-panel-${props.index}`}
            hidden={props.value !== props.index}
            role="tabpanel"
            aria-labelledby={`wishlist-tab-${props.index}`}>
            {props.value === props.index && (
                <Box p={3}>
                    {props.children}
                </Box>
            )}
        </div>
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
        this.state = WishList.divideItems(WishList.fixInvalidItemFields(props.contents));
        this.state.statistics = this.calculateStatistics();
        this.state.value = 0;
        this.handleChange = this.handleChange.bind(this);
    }

    static fixInvalidItemFields(contents = []) {
        let today = new Date();
        const patch = {
            state: 'open',
            name: '',
            note: '',
            price: 0,
            createTime:
                `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            processTime: ''
        }
        return contents.map(item => {
            if (item.name || item.note) {
                let newItem = {...patch, ...item};

                const validState = new Set(['open', 'purchased', 'rejected']);
                if (!validState.has(newItem.state)) {
                    newItem.state = 'open';
                } else if (newItem.state === 'rejected' && !newItem.rejectReason) {
                    newItem.rejectReason = '';
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

    static divideItems(contents = []) {
        let openList = [], purchasedList = [], rejectedList = [];
        contents.forEach(item => {
            if (item.state) {
                switch (item.state) {
                    case 'open':
                        openList.push(item);
                        break;
                    case 'purchased':
                        purchasedList.push(item);
                        break;
                    case 'rejected':
                        rejectedList.push(item);
                        break;
                    default:
                        console.log(`invalid item state:${item.state} in ${item}`);
                }
            }
        })
        return ({
            openList: openList,
            purchasedList: purchasedList,
            rejectedList: rejectedList
        })
    }

    calculateStatistics() {
        let cheapestRemain = Number.MAX_VALUE;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let remain = this.state.openList.map((item) => {
            cheapestRemain = cheapestRemain > item.price ? item.price : cheapestRemain;
            return item.price
        }).reduce(reducer, 0);
        let spent = this.state.purchasedList.map((item) => {
            return item.price
        }).reduce(reducer, 0);
        let saved = this.state.rejectedList.map((item) => {
            return item.price
        }).reduce(reducer, 0);
        return ({
            total: remain + spent + saved,
            remain: remain,
            spent: spent,
            saved: saved,
            cheapestRemain: cheapestRemain
        })

    }

    handleChange(event, newValue) {
        this.setState({value: newValue});
    };

    render() {
        return (
            <div id="wish-list" className={this.props.classes.root}>
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
            </div>
        );
    }
}

export default withStyles(styles)(WishList);