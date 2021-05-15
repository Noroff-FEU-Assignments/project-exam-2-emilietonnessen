import { FileProps } from '../../../constants/interfaces';

const File: React.FC<FileProps> = ({ name, label, error, cssClass, onChange, register, added }) => {

    let cssError = '';

    if (error === undefined) {
        cssError = ''
    } else {
        cssError = 'form__file--error';
    }

    return (
        <div className={"form__group " + cssClass}>
            <label htmlFor={name} className="form__label">
                {label}
            </label>

            <label className={"form__file-upload " + cssError}>
                <input 
                    type="file" 
                    name={name} 
                    id={name} 
                    //</div>className={"form__file-upload " + cssError} 
                    onChange={onChange} 
                    ref={register} />
                    
                    {added ? added : "choose an image"}
            </label>
            

            {error}
        </div>
    );
}

export default File;