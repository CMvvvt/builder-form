import * as React from 'react';

type InputProps = {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  input?: React.ReactElement;
};

function CustomInput({ label, value, onChange, input }: InputProps) {
  return (
    <div className="row align-items-center mb-3">
      <div className="col-3">
        <label>{label}</label>
      </div>
      <div className="col-5">
        {input ? (
          input
        ) : (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="custom-input"
          />
        )}
      </div>
    </div>
  );
}

export default CustomInput;
