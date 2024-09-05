import { useState } from "react";
import classes from "./Calendar.module.css";
import DaysOfWeek from "./DaysOfWeek/DaysOfWeek";
import Header from "./Header/Header";
import FormForEvents from "./FormForEvents/FormForEvents";

export default function Calendar() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [eventsCurrentDate, setEventsCurrentDate] = useState(new Date());
    const eventsCurrentHours = useState(String(currentDate.getHours() + 1));
    const eventsCurrentMinutes = useState("00");

    const firstDayOfMonth = new Date( currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDaysOfMonth = new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const lastDayPrevMonth = new Date( currentDate.getFullYear(), currentDate.getMonth(), 0);

    const lastDaysPrevMonth = createlastDaysPrevMonth(firstDayOfMonth, lastDayPrevMonth)
    const month = createMonth(currentDate, lastDaysOfMonth);
    const firstDaysNextMonth = createfirstDaysNextMonth(lastDaysOfMonth);

    function prevMonth(day = 1){
        if(currentDate.getFullYear() == 2012 && currentDate.getMonth() == 0){
            setCurrentDate(new Date( currentDate.getFullYear(), currentDate.getMonth(), day));
        } else {
            setCurrentDate(new Date( currentDate.getFullYear(), currentDate.getMonth() - 1, day));
        }
    }

    function nextMouth(day = 1){
        if(currentDate.getFullYear() === 2030 && currentDate.getMonth() == 11){
            setCurrentDate(new Date( currentDate.getFullYear(), currentDate.getMonth(), day));
        } else {
            setCurrentDate(new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, day));
        }
    }

    function events(day) {
        setEventsCurrentDate(new Date (currentDate.getFullYear(), currentDate.getMonth(), day));
    }

    function prevEventsMonth(day = 1){
        setCurrentDate(new Date( currentDate.getFullYear(), currentDate.getMonth() - 1, day));
        setEventsCurrentDate(new Date (currentDate.getFullYear(), currentDate.getMonth() - 1, day));
    }

    function nextEventsMouth(day = 1){
        setCurrentDate(new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, day));
        setEventsCurrentDate(new Date (currentDate.getFullYear(), currentDate.getMonth() + 1, day));
    }

    return (
            <div className={classes.calendar}>
                <Header
                    mouthIndex={ currentDate.getMonth() }
                    year={ currentDate.getFullYear() }
                    prev={ prevMonth }
                    next={ nextMouth }
                    />
                <DaysOfWeek
                    lastDaysPrevMonth = {lastDaysPrevMonth}
                    month={ month }
                    firstDaysNextMonth = {firstDaysNextMonth}
                    onClickPrevMonth={ prevEventsMonth }
                    onClickCurrentEvents= { events }
                    onClickNextMonth= { nextEventsMouth }
                    buttonEvents = { eventsCurrentDate }
                    />
                <FormForEvents
                    eventsCurrentDate = {eventsCurrentDate}
                    eventsCurrentHours = {eventsCurrentHours}
                    eventsCurrentMinutes = {eventsCurrentMinutes}
                    />
            </div>
        );
}

function createlastDaysPrevMonth(firstDayOfMonth, lastDayPrevMonth){
    const days = [];
    let lastPrevMonth = lastDayPrevMonth.getDate();
    for(let i = 0; i < firstDayOfMonth.getDay(); i++)
    {
        days.unshift(
                {
                    numberDate: lastPrevMonth,
                    currentDate: new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() - 1, lastPrevMonth).toDateString()
                }
            );
        lastPrevMonth -= 1;
    }
    return days;
}

function createMonth(currentDate, lastDaysOfMonth) {
    const month = [];
    for (let i = 1; i <= lastDaysOfMonth.getDate(); i++)
    {
        if (
            i === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear()
        )
        {
            month.push(
                {
                    today: i,
                    currentDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()
                }
            );
        }
        else month.push(
            {
                numberDate: i,
                currentDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()
            }
        );
    }
    return month;
}

function createfirstDaysNextMonth(lastDaysOfMonth) {
    const days = [];
    for(let i = lastDaysOfMonth.getDay() + 1, j = 1; i < 7; i++, j++)
    {
        days.push(
            {
                numberDate: j,
                currentDate: new Date(lastDaysOfMonth.getFullYear(), lastDaysOfMonth.getMonth() + 1, j).toDateString()
            }
        );
    }
    return days
}
