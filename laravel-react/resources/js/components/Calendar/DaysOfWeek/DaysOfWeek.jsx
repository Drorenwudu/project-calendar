import classes from "./DaysOfWeek.module.css";
import { daysOfWeek } from "../utils/dataCalendar";

export default function DaysOfWeek(
    {
        lastDaysPrevMonth,
        month,
        firstDaysNextMonth,
        onClickPrevMonth,
        onClickCurrentEvents,
        onClickNextMonth,
        buttonEvents,
    })
    {
    return (
            <div className={classes.daysWeek}>
                {daysOfWeek.map(dayName => <span key={dayName} className={classes.day}>{dayName}</span>)}
                {lastDaysPrevMonth.map((day) =>
                    <button
                        onClick={() => onClickPrevMonth(day["numberDate"])}
                        key={ day["currentDate"] }
                        className={ `${classes.date} ${classes.faded}
                        ${buttonEvents.toDateString() === day["currentDate"]? classes["events-day"]: ""}`
                    }
                    >{ day["numberDate"] }</button>
                )}
                {month.map((day) =>
                    day["today"]?
                    (
                        <button
                            onClick={() => onClickCurrentEvents(day["today"])}
                            key={ day["currentDate"] }
                            className={ `${classes.date} ${classes["current-day"]}
                            ${buttonEvents.toDateString() === day["currentDate"]? classes["events-day"]: ""}`
                        }
                        >{ day["today"] }</button>
                    )
                    :
                    (
                        <button
                            onClick={() => onClickCurrentEvents(day["numberDate"])}
                            key={ day["currentDate"] }
                            className={ `${classes.date}
                            ${buttonEvents.toDateString() === day["currentDate"]? classes["events-day"]: ""}`
                        }
                        >{ day["numberDate"] }</button>)
                    )
                }
                {firstDaysNextMonth.map((day) =>
                    <button
                        onClick={ () => onClickNextMonth(day["numberDate"]) }
                        key={ day["currentDate"] }
                        className={ `${classes.date} ${classes.faded}
                        ${buttonEvents.toDateString() === day["currentDate"]? classes["events-day"]: ""}`
                    }
                    >{ day["numberDate"] }</button>
                )}
            </div>
        );
}
