import React from 'react';
import Input from './Input';
const SizeInputs = (props) => {
  var array1 = Object.entries(props.options);
  return (
    <div>
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <div className="input-group">
        {array1.map(([size, count]) => {
          return (
            <label key={size}>
              {size}
              <Input
                name={size}
                inputType={'number'}
                value={count}
                handleChange={props.handleChange}
                onMouseUp={props.onMouseUpp}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};
export default SizeInputs;
