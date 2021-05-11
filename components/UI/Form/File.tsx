import { FileProps } from '../../../constants/interfaces';
import Error from './Error';

const File: React.FC<FileProps> = ({ name, label, error, cssClass, onChange }) => {

    console.log("[File Error]", error);

    let cssError = '';

    if (error === undefined) {
        cssError = ''
    } else {
        cssError = 'form__file--error';
    }

    return (
        <div className={"form__group " + cssClass}>
            <label htmlFor={name} className="form__label">{label}</label>
            <input type="file" name={name} id={name} className={"form__file " + cssError} onChange={onChange} />
            {error ?
                <Error>{error}</Error> : null}
        </div>
    );
}

export default File;