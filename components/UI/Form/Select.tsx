interface SelectProps {
    name: string;
    children: React.ReactNode;
    label: string;
    register: () => void;
    error: any;
    onChange?: any;
}
const Select: React.FC<SelectProps> = ({name, children, label, register, error, onChange }) => {
    let cssError = '';

    if (error === undefined) {
        cssError = ''
    } else {
        cssError = 'form__input--error';
    }

    return (
        <div className={`form__group booking-form__group--${name}`}>
            <label 
                htmlFor={name} 
                className="form__label">
                {label}
            </label>

            <select 
                onChange={onChange}
                name={name} 
                id={name} 
                className={"form__input " + cssError }
                placeholder="Choose a Room" 
                ref={register}>
                
                <option value="" hidden></option>
                {children}
            </select>

            {error}
        </div>
    )
};


export default Select;