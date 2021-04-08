import {Typography} from "@material-ui/core";

export default function Statistics(props) {
    const calculate = () => {
        let cheapest = Number.MAX_VALUE;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let remain = props.open.map((item) => {
            cheapest = cheapest > item.price ? item.price : cheapest;
            return item.price
        }).reduce(reducer, 0);
        let spent = props.purchased.map((item) => {
            return item.price
        }).reduce(reducer, 0);
        let saved = props.rejected.map((item) => {
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
    const vo = calculate();

    const renderOne = (element) => {
        return (
            <Typography id={element[0]} key={element[0]} variant="body1">
                {element[0]}{': '}{element[1]}
            </Typography>
        )
    }

    return (
        <>
            {renderOne(vo[0])}
            {renderOne(vo[1])}
            {renderOne(vo[2])}
            {renderOne(vo[3])}
            {renderOne(vo[4])}
        </>
    );
}