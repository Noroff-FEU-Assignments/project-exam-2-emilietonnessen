interface TextareaProps {
    register: () => void;
    name: string;
    label: string;
    placeholder: string; 
    error: any;
    defaultValue?: any;
}

const Textarea: React.FC<TextareaProps> = ({name, label, placeholder, register, error, defaultValue}) => {
    let cssError = '';

    if (error === undefined) {
        cssError = ''
    } else {
        cssError = 'form__input--error';
    }

    return (
        <div className={"form__group " + `booking-form__group--${name}`}>
            <label 
                htmlFor={name} 
                className="form__label" >
                    {label}
            </label>

            <textarea 
                autoComplete="nope"
                ref={register}
                name={name} 
                className={"form__textarea " + cssError}
                id={name}
                placeholder={placeholder}
                defaultValue={defaultValue} />
                
            {error}
        </div>
    );
};

export default Textarea;