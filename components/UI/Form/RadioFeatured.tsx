import { RadioProps } from '../../../constants/interfaces';

const RadioFeatured: React.FC<RadioProps> = ({name, label, register, error, checked, cssClass}) => {

    let cssError = '';

    if (error === undefined) {
        cssError = ''
    } else {
        cssError = 'form__radio--error';
    }

    return (
        <div className={"form__group " + cssClass}>

            {/* Form Label: */}
            <label className="form__label">{label}</label>

            {/* True/Featured Option */}
            <div className="form__radio-group">
                <input 
                    ref={register} 
                    name={"radio-boolean " + name} 
                    type="radio" 
                    id="radio-true" 
                    className={"form__radio " + cssError} 
                    checked={checked} 
                    value="true" />
                <label htmlFor="radio-true" className="form__radio-label">Yes</label>
            </div>

            {/* False/Not Featured Option */}
            <div className="form__radio-group">
                <input 
                    ref={register} 
                    name={"radio-boolean " + name} 
                    type="radio" 
                    id="radio-false" 
                    className={"form__radio " + cssError} 
                    checked={checked} 
                    value="false" />
                <label htmlFor="radio-false" className="form__radio-label">No</label>
            </div>
            
            {/* Error: */}
            {error}
        </div>
    );
}

export default RadioFeatured;