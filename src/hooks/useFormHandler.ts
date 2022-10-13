import * as React from 'react';
import FieldService from '../service/MockService';
import { FormData, initialFormData } from '../types';

function useFormHandler(data: FormData) {
  const [formData, setFormData] = React.useState(data);
  const { label, default: defaultChoice, displayAlpha, choices } = formData;

  const [addChoice, setAddChoice] = React.useState('');
  const [removeChoice, setRemoveChoice] = React.useState('');
  const [displayedChoices, setDisplayedChoices] = React.useState(
    displayAlpha ? [...choices].sort() : choices
  );

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

  return {
    formData,
    addChoice,
    removeChoice,
    displayedChoices,

    setFormData,
    setAddChoice,
    setRemoveChoice,
    setDisplayedChoices,

    addChoiceHandler,
    removeChoiceHandler,
    changeOrderHandler,
    submitFormHandler,
    clearFormHandler,
  };
}

export default useFormHandler;
