interface InputProps {
    register: any;
    name: string;
    label: string;
    type: string;
    placeholder: string; 
    children?: React.ReactNode;
}


const Input: React.FC<InputProps> = ({name, label, type, placeholder, register, children}) => {
    return (
        <div className={"form__group " + `booking-form__group--${name}`}>
            <label 
                htmlFor={name} 
                className="form__label"
            >
                {label}
            </label>

            <input 
                    
                autoComplete="nope"
                {...register}
                name={name} 
                type={type} 
                className="form__input "
                id={name}
                placeholder={placeholder}
             />
            
            {children}
        </div>
    );
}

export default Input;