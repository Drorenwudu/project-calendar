import classes from "./SelectDateTime.module.css";
export default function SelectTime({sizeSelect, value, onChange}) {
    const arr = [];
    for(let i = 0; i < sizeSelect; i++){
        if(i <= 9){
            arr.push(<option key={"0" + i} value={"0" + i}>{"0" + i}</option>)
        } else {
            arr.push(<option key={`${i}`} value={`${i}`}>{`${i}`}</option>)
        }
    }
    return (
            <select value={value} onChange={(e) => onChange(e.target.value)} className={classes.select}>
                {arr}
            </select>
        );
}
