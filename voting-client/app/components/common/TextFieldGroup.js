import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({field, value, label, error, type, onChange}) => {
    return (
        <div className={classnames("form-group", {'alert': error })}>
            <label className={classnames({'is-invalid-label': error})}>{label}</label>
            <input 
                value={value} 
                onChange={onChange} 
                type={type} 
                name={field} 
                className={classnames("form-control", {"is-invalid-input": error})} />
            {error && <span className="form-error is-visible">{error}</span>}
        </div>
    );
}

TextFieldGroup.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
    type: 'text' 
}

export default TextFieldGroup;