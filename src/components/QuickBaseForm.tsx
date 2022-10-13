import * as React from 'react';
import { Button } from 'react-bootstrap';
import CustomInput from './CustomInput';
import { FormData } from '../types/index';
import '../index.css';
import useFormHandler from '../hooks/useFormHandler';

type PropsType = {
  formData: FormData;
};

function QuickBaseForm(props: PropsType) {
  const {
    formData,
    addChoice,
    removeChoice,
    displayedChoices,

    setFormData,
    setAddChoice,
    setRemoveChoice,

    addChoiceHandler,
    removeChoiceHandler,
    changeOrderHandler,
    submitFormHandler,
    clearFormHandler,
  } = useFormHandler(props.formData);

  const {
    label,
    required,
    default: defaultChoice,
    displayAlpha,
    isMulti,
  } = formData;

  const makeOption = (value: string, index: number) => {
    return (
      <option key={index} value={value}>
        {value}
      </option>
    );
  };

  // store form data in Localstorage if changes occur
  React.useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <form onSubmit={submitFormHandler}>
      <CustomInput
        label="Label"
        value={label}
        onChange={(event) =>
          setFormData({ ...formData, label: event.target.value })
        }
      />
      <CustomInput
        label="Type"
        input={
          <div className="type">
            <select
              value={isMulti.toString()}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  isMulti: e.target.value === 'true',
                });
              }}
            >
              <option value="false">Single-select</option>
              <option value="true">Multi-select</option>
            </select>
            {isMulti && (
              <div>
                <input
                  type="checkbox"
                  checked={required}
                  onChange={() =>
                    setFormData({ ...formData, required: !required })
                  }
                />
                <label>A value is required</label>
              </div>
            )}
          </div>
        }
      />
      <CustomInput
        label="Default Value"
        value={defaultChoice}
        onChange={(event) =>
          setFormData({ ...formData, default: event.target.value })
        }
      />
      <CustomInput
        label="Choice"
        input={
          <div>
            <select
              multiple
              value={[removeChoice]}
              onChange={(event) => {
                setRemoveChoice(event.target.value);
              }}
              style={{ height: '150px', width: '100%' }}
            >
              {displayedChoices.map(makeOption)}
            </select>
            <div className="flex-layout">
              <input
                type="text"
                value={addChoice}
                onChange={(event) => setAddChoice(event.target.value)}
                size={20}
              />
              <Button className="btn-sm button" onClick={addChoiceHandler}>
                Add
              </Button>
            </div>
            <div className="flex-layout">
              <input
                type="text"
                value={removeChoice}
                placeholder="select to remove"
                disabled
                size={20}
              />
              <Button
                className="btn-sm button"
                variant="danger"
                disabled={removeChoice === ''}
                onClick={removeChoiceHandler}
              >
                Remove
              </Button>
            </div>
          </div>
        }
      />
      <CustomInput
        label="Order"
        input={
          <select
            value={displayAlpha.toString()}
            onChange={changeOrderHandler}
            className="custom-input"
          >
            <option value="true">Display choices in Alphabetical</option>
            <option value="false">Default</option>
          </select>
        }
      />
      <div className="row">
        <div className="col-3"></div>
        <div className="col-5 flex-layout">
          <Button variant="success" type="submit" className="btn-sm button">
            Save
          </Button>
          <Button className="btn-sm button" onClick={clearFormHandler}>
            Clear
          </Button>
          <Button
            variant="secondary"
            className="btn-sm button"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

export default QuickBaseForm;
