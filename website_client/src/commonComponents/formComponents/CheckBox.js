import React from 'react';
const CheckBox = (props) => {
  return (
    <div>
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <div className="checkbox-group">
        {props.options.map((option) => {
          return (
            <label key={option}>
              {option}
              <input
                id={option}
                name={props.name}
                onChange={props.handleChange}
                value={option}
                checked={props.selectedOptions.indexOf(option) > -1}
                type="checkbox"
                onMouseUp={props.onMouseUpp}
              />{' '}
            </label>
          );
        })}
      </div>
    </div>
  );
};
export default CheckBox;
