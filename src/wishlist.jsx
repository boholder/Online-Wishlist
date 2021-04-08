import React from 'react'
import {AppBar, Box, Grid, Tab, Tabs, withStyles} from "@material-ui/core";
import {Favorite, RemoveShoppingCart, Reorder, ShoppingCart} from "@material-ui/icons";
import Item from "./item-component-parts/Item";
import Statistics from "./statistics";
import {curry} from "lodash";

const styles = {
    root: {
        flexGrow: 1,
    },
    itemGrid: {
        width: '100%'
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

class Wishlist extends React.Component {
    constructor(props) {
        super(props);
        // value for tab switching
        this.state = {value: 0};
        this.handleTabChange = this.handleTabChange.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    handleTabChange(event, newValue) {
        this.setState({value: newValue});
    }

    renderList(listName, list) {
        let curryOnChange = curry(this.props.onChange);
        return (
            <Grid container spacing={1}>
                {list.map((item, index) => {
                    return (
                        <Grid item
                              className={this.props.classes.itemGrid}
                              key={item.key}>
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
                                  onChange={curryOnChange(listName)(index)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        );
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
                          onChange={this.handleTabChange}
                          variant="scrollable"
                          scrollButtons="on">
                        <Tab label="Open" icon={<Favorite/>} {...tabA11yProps(0)} disableTouchRipple/>
                        <Tab label="Purchased" icon={<ShoppingCart/>} {...tabA11yProps(1)} disableTouchRipple/>
                        <Tab label="Rejected" icon={<RemoveShoppingCart/>} {...tabA11yProps(2)} disableTouchRipple/>
                        <Tab label="Statistics" icon={<Reorder/>} {...tabA11yProps(3)} disableTouchRipple/>
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    {this.renderList('open', wishlist.open)}
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    {this.renderList('purchased', wishlist.purchased)}
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    {this.renderList('rejected', wishlist.rejected)}
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    <Statistics wishlist={props.wishlist}/>
                </TabPanel>
            </>
        );
    }
}

export default withStyles(styles)(Wishlist);