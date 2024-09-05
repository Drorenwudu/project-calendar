import { useEffect, useState } from "react";
import classes from "./FormForEvents.module.css";
import Button from "../Button/Button";
import From from "./Form/Form";

export default function FormForEvents({eventsCurrentDate, eventsCurrentHours, eventsCurrentMinutes}) {
    const [events, setEvents] = useState([]);
    const [viweEvents, setViweEvents] = useState(false);

    function seeEvents(){
        setViweEvents(!viweEvents);
    }

    useEffect(() => {
        async function getEvent(){
            try {
                const year = eventsCurrentDate.getFullYear();
                const month = eventsCurrentDate.getMonth() + 1;
                const day = eventsCurrentDate.getDate();
                const response = await axios.get(`/api/`, {
                    params: {
                        publish_date: year + "-" + month + "-" + day,
                    }
                });
                setEvents(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getEvent()
    }, [eventsCurrentDate, viweEvents])


    return (
            <div className={classes.container}>
                    { events.length === 0? <h2>Add events</h2> : <h2>Events</h2>}
                    {
                        events.map((value, index) => (
                            <div className={classes.events} key={value + index}>
                                <div className={classes.box1}>
                                    <span className={classes["title-events"]}>{value.time}</span>
                                </div>
                                <div className={classes.box2}>
                                    <span className={classes["title-events"]}>{value.title}</span>
                                    <p>{value.description}</p>
                                </div>
                            </div>
                        ))
                    }
                    <div className={classes["button-container-add"]}>
                        {!viweEvents? <Button onClick={seeEvents}>{'+'}</Button>: ""}
                    </div>
                    <div id="formForEvents">
                        { viweEvents? <From
                                        seeEvents={seeEvents}
                                        selectDate={eventsCurrentDate}
                                        eventsHours={eventsCurrentHours}
                                        eventsMinutes={eventsCurrentMinutes}
                                        />
                                        : ""}
                    </div>
            </div>
        );
}
