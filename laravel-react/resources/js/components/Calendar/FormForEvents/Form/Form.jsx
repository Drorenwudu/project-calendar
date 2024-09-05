import classes from "./Form.module.css";
import Button from "../../Button/Button";
import SelectTime from "./Select/SelectTime";
import axios from "axios";
import { useState } from "react";

export default function From({seeEvents, selectDate, eventsHours, eventsMinutes}) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function postEvent(e){
        e.preventDefault();
        try {
            const response = await axios.post("/api/event", {
                dateId: selectDate.toDateString(),
                ...formData,
                publish_date: new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate() + 1),
                time: `${eventsHours[0]}:${eventsMinutes[0]}`
            },
                {
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });
            console.log(response.data);
            seeEvents();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className={classes.form} onSubmit={postEvent}>
            <span className={classes.month}>Date: {selectDate.toDateString()} </span>
            <div className="time">
                <span className={classes.month}>Time: </span>
                <SelectTime sizeSelect={24} value={eventsHours[0]} onChange={eventsHours[1]}/>
                <SelectTime sizeSelect={60} value={eventsMinutes[0]} onChange={eventsMinutes[1]}/>
            </div>
            <div className={classes.indent}>
                <input
                    className={classes.title}
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    />
                </div>
                <div className={classes.indent}>
                <textarea
                    className={classes.description}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    />
                    </div>
                    <div className={classes["button-container-center"]}>
                        <Button onClick={seeEvents}>Delete</Button>
                        <Button>Save</Button>
                    </div>
        </form>
        );
}
