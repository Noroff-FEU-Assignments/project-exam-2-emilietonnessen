import { useEffect, useState } from "react";

interface SelectProps {
    name: string;
    children: React.ReactNode;
    label: string;
    register: () => void;
    error: any;
    onChange?: any;
    defaultValue?: any;
}
const Select: React.FC<SelectProps> = ({name, children, label, register, error, onChange, defaultValue }) => {
    
    //const [value, setValue]: any = useState();
    let value= defaultValue;
    //console.log("[Default value]", defaultValue);

    /* useEffect(() => {
        if (defaultValue != undefined) {
            setValue(defaultValue)
            //console.log("[Value]", value);
        } 
        
    }, []) */

    let cssError = '';

    if (error === undefined) {
        cssError = ''
    } else {
        cssError = 'form__input--error';
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        value = event.target.value;
        console.log("[Target]", event.target.value);
        console.log("[new value]", value);
    }

    console.log("[Value]", value);

    return (
        <div className={`form__group booking-form__group--${name}`}>
            <label 
                htmlFor={name} 
                className="form__label">
                {label}
            </label>

            <select 
                
                onChange={onChange ? onChange : onChangeHandler}
                name={name} 
                id={name} 
                className={"form__input " + cssError }
                placeholder="Choose a Room" 
                ref={register}
                value={value}
                 >
                
                {/* <option value="" hidden></option> */}
                {children}
            </select>

            {error}
        </div>
    )
};


export default Select;