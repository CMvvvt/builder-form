import * as React from 'react';
import { Button } from 'react-bootstrap';
import CustomInput from './CustomInput';
import { FormData, initialFormData } from '../types/index';
import FieldService from '../service/MockService';
import '../index.css';

type PropsType = {
  formData: FormData;
};

function QuickBaseForm(props: PropsType) {
  const [formData, setFormData] = React.useState(props.formData);
  const {
    label,
    required,
    default: defaultChoice,
    displayAlpha,
    choices,
    isMulti,
  } = formData;

  const [addChoice, setAddChoice] = React.useState('');
  const [removeChoice, setRemoveChoice] = React.useState('');
  const [displayedChoices, setDisplayedChoices] = React.useState(
    displayAlpha ? [...choices].sort() : choices
  );

  const makeOption = (value: string, index: number) => {
    return (
      <option key={index} value={value}>
        {value}
      </option>
    );
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle validation of Label manually
    if (label === '') {
      alert('Lable cannot be empty!');
      return;
    }
    const data = formData;
    // handle submit when defualt value is not in choices
    if (!choices.includes(defaultChoice)) {
      setDisplayedChoices(
        displayAlpha
          ? [...choices, defaultChoice].sort()
          : [...choices, defaultChoice]
      );
      setFormData({ ...formData, choices: [...choices, defaultChoice] });
      data.choices.push(defaultChoice);
    }
    console.log('Data Submitted:', data);
    FieldService.saveField(JSON.stringify(data));
  };

  const addChoiceHandler = () => {
    // Handle validations
    if (addChoice === '') {
      alert('Choice can not be empty!');
      return;
    }
    if (choices.includes(addChoice)) {
      alert(`'${addChoice}' already exists in choices!`);
      return;
    }
    if (choices.length === 50) {
      alert('You can not add more than 50 choices!');
      return;
    }

    setFormData({ ...formData, choices: [...choices, addChoice] });
    setDisplayedChoices(
      displayAlpha
        ? [...displayedChoices, addChoice].sort()
        : [...displayedChoices, addChoice]
    );
    setAddChoice('');
  };

  const removeChoiceHandler = () => {
    setFormData({
      ...formData,
      choices: choices.filter((choice) => choice !== removeChoice),
    });
    setDisplayedChoices(
      displayedChoices.filter((choice) => choice !== removeChoice)
    );
    setRemoveChoice('');
  };

  const changeOrderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      displayAlpha: event.target.value === 'true',
    });
    event.target.value === 'false'
      ? setDisplayedChoices(choices)
      : setDisplayedChoices([...choices].sort());
  };

  const clearFormHandler = () => {
    setFormData(initialFormData);
    setDisplayedChoices([]);
    setAddChoice('');
    setRemoveChoice('');
  };

  const cancelFormHandler = () => {
    localStorage.clear();
    window.location.reload();
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
            onClick={cancelFormHandler}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

export default QuickBaseForm;
