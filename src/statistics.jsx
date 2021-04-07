import {Typography} from "@material-ui/core";

export default function Statistics(props) {
    const wishlist = props.wishlist;
    const vo = () => {
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
        return ([
            ["Total amount in all three lists", remain + spent + saved],
            ["Total price of opening wishes", remain],
            ["Total amount of money spent", spent],
            ["Total amount of money saved", saved],
            ["Cheapest opening wish costs", cheapest],
        ])

    }

    return (
        vo().map((value) => {
                return (
                    <Typography id={value[0]} key={value[0]}>
                        {value[0]}{': '}{value[1]}
                    </Typography>)
            }
        )
    );
}