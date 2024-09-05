import classes from "./Header.module.css";
import Button from "../Button/Button";
import { monthsOfYear } from "../utils/dataCalendar";

export default function Header({mouthIndex, year, prev, next}) {
    return (
            <div className={classes.header}>
                <Button onClick={ () => prev() }>{'<'}</Button>
                    <span className={classes.month}>{monthsOfYear[mouthIndex] + " " + year}</span>
                <Button onClick={ () => next() }>{'>'}</Button>
            </div>
        );
}
