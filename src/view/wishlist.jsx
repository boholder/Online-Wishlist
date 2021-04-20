import React from 'react'
import {AppBar, Box, Grid, Tab, Tabs, withStyles} from "@material-ui/core";
import {Favorite, RemoveShoppingCart, Reorder, ShoppingCart} from "@material-ui/icons";
import Item from "./item-component-parts/Item";
import Statistics from "./statistics";
import {curry} from "lodash";
import {ListName} from "../business/constants";
import {makeStyles} from "@material-ui/core/styles";

const styles = {
    root: {
        flexGrow: 1,
    },
};

const useStyles = makeStyles(({
    itemGrid: {
        width: '100%'
    }
}));

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

function ItemList(props) {

    const classes = useStyles();
    // TODO Drag & Drop 未实现
    return (
        <Grid container spacing={1}>
            {props.data.map((item, index) => {
                return (
                    <Grid item
                          key={`${item.key}-gird`}
                          className={classes.itemGrid}
                    >
                        <Item type={props.name}
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
                              onChange={props.onChange(index)}
                              onItemMove={props.onItemMove(index)}
                              onUndoItemMove={props.onUndoItemMove}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
}

class Wishlist extends React.Component {
    constructor(props) {
        super(props);
        // value for tab switching
        this.state = {value: 0};
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(event, newValue) {
        this.setState({value: newValue});
    }

    render() {
        const props = this.props;
        let curryOnChange = curry(props.onChange);
        let curryOnItemMove = curry(props.onItemMove);
        // TODO open页面应有一个添加项按钮
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
                    <ItemList name={ListName.OPEN}
                              data={props.open}
                              onChange={curryOnChange(ListName.OPEN)}
                              onItemMove={curryOnItemMove(ListName.OPEN)}
                              onUndoItemMove={props.onUndoItemMove}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <ItemList name={ListName.PURCHASED}
                              data={props.purchased}
                              onChange={curryOnChange(ListName.PURCHASED)}
                              onItemMove={curryOnItemMove(ListName.PURCHASED)}
                              onUndoItemMove={props.onUndoItemMove}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <ItemList name={ListName.REJECTED}
                              data={props.rejected}
                              onChange={curryOnChange(ListName.REJECTED)}
                              onItemMove={curryOnItemMove(ListName.REJECTED)}
                              onUndoItemMove={props.onUndoItemMove}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    <Statistics open={props.open}
                                purchased={props.purchased}
                                rejected={props.rejected}/>
                </TabPanel>
            </>
        );
    }
}

export default withStyles(styles)(Wishlist);