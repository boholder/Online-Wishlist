import React from 'react'
import {AppBar, Box, Tab, Tabs, withStyles} from "@material-ui/core";
import {Favorite, RemoveShoppingCart, Reorder, ShoppingCart} from "@material-ui/icons";
import Item from "./item-component-parts/Item";

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
        // value for tab switching
        this.state = {value: 0};
        this.handleChange = this.handleChange.bind(this);
        this.renderOneList = this.renderOneList.bind(this);
    }

    handleChange(event, newValue) {
        this.setState({value: newValue});
    }

    renderOneList(listName, list) {
        return list.map((item, index) => {
            return (
                <Item type={listName}
                      index={index}
                      key={item.key}
                      state={item.state}
                      name={item.name}
                      link={item.link}
                      price={item.price}
                      createTime={item.createTime}
                      processTime={item.processTime}
                      acceptNote={item.acceptNote}
                      rejectNote={item.rejectNote}
                />
            );
        });
    }

    render() {
        const props = this.props;
        const wishlist = props.wishlist;
        return (
            <>
                <AppBar id="wish-list"
                        className={props.classes.root}
                        position="static">
                    <Tabs value={this.state.value}
                          onChange={this.handleChange}
                          variant="scrollable"
                          scrollButtons="on">
                        <Tab label="Open" icon={<Favorite/>} {...tabA11yProps(0)} disableTouchRipple/>
                        <Tab label="Purchased" icon={<ShoppingCart/>} {...tabA11yProps(1)} disableTouchRipple/>
                        <Tab label="Rejected" icon={<RemoveShoppingCart/>} {...tabA11yProps(2)} disableTouchRipple/>
                        <Tab label="Statistics" icon={<Reorder/>} {...tabA11yProps(3)} disableTouchRipple/>
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                   {this.renderOneList('open', wishlist.open)}
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    {this.renderOneList('purchased', wishlist.purchased)}
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    {this.renderOneList('rejected', wishlist.rejected)}
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    // TODO statistics
                </TabPanel>
            </>
        );
    }
}

export default withStyles(styles)(WishList);