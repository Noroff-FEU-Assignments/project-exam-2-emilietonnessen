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
                <input 
                    ref={register} 
                    name={name} 
                    type="radio" 
                    id="radio-true" 
                    className="form__radio "
                    checked={checked}
                    value="true" />
                <label htmlFor="radio-true" className="form__radio-label">Yes</label>
                    

                {/* False/Not Featured Option */}
                    
                <input 
                    ref={register} 
                    name={name} 
                    type="radio" 
                    id="radio-false" 
                    className="form__radio "
                    checked={checked}
                    value="false" />
                <label htmlFor="radio-false" className="form__radio-label">No</label>
            
                    
                
            {error}
        </div>
    );
}

export default RadioFeatured;