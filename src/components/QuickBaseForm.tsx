import * as React from 'react';
import { Button } from 'react-bootstrap';
import CustomInput from './CustomInput';
import { FormData } from '../types/index';
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
  } = formData;

  const [addChoice, setAddChoice] = React.useState('');
  const [displayedChoices, setDisplayedChoices] = React.useState(
    displayAlpha ? [...choices].sort() : choices
  );
  const [removeChoice, setRemoveChoice] = React.useState('');

  const makeOption = (value: string, index: number) => {
    return (
      <option key={index} value={value}>
        {value}
      </option>
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // handle validation of Label manually
    if (label === '') {
      alert('Lable cannot be empty!');
      return;
    }

    const data = formData;

    // handle submit when defualt value is not in choices
    if (!choices.includes(defaultChoice)) {
      setDisplayedChoices([...displayedChoices, defaultChoice]);
      setFormData({ ...formData, choices: [...choices, defaultChoice] });
      data.choices.push(defaultChoice);
    }
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
    const choicesToDisplay = [...displayedChoices, addChoice];
    setDisplayedChoices(
      displayAlpha ? choicesToDisplay.sort() : choicesToDisplay
    );
    setAddChoice('');
  };

  const removeChoiceHandler = () => {
    setFormData({
      ...formData,
      choices: choices.filter((e) => e !== removeChoice),
    });
    setDisplayedChoices(displayedChoices.filter((e) => e !== removeChoice));
    setRemoveChoice('');
  };

  const clearForm = () => {
    setFormData({
      label: '',
      required: false,
      choices: [],
      displayAlpha: false,
      default: '',
    });
    setDisplayedChoices([]);
    setAddChoice('');
    setRemoveChoice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        label="Label"
        value={label}
        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
      />
      <CustomInput
        label="Type"
        input={
          <div className="type">
            <span>Multi-select </span>
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
          </div>
        }
      />
      <CustomInput
        label="Default Value"
        value={defaultChoice}
        onChange={(e) => setFormData({ ...formData, default: e.target.value })}
      />
      <CustomInput
        label="Choice"
        input={
          <div>
            <select
              multiple
              value={[removeChoice]}
              onChange={(e) => {
                setRemoveChoice(e.target.value);
              }}
              style={{ height: '150px', width: '100%' }}
            >
              {displayedChoices.map(makeOption)}
            </select>
            <div className="flex-layout">
              <input
                type="text"
                value={addChoice}
                onChange={(e) => setAddChoice(e.target.value)}
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
            onChange={(e) => {
              setFormData({
                ...formData,
                displayAlpha: e.target.value === 'true',
              });
              e.target.value === 'false'
                ? setDisplayedChoices(choices)
                : setDisplayedChoices([...choices].sort());
            }}
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
          <Button className="btn-sm button" onClick={clearForm}>
            Clear
          </Button>
          <Button variant="secondary" className="btn-sm button">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

export default QuickBaseForm;
