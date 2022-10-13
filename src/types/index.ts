export interface FormData {
  label: string;
  required: boolean;
  choices: string[];
  displayAlpha: boolean;
  default: string;
  isMulti: boolean;
}

export const initialFormData = {
  label: '',
  required: false,
  choices: [],
  displayAlpha: false,
  default: '',
  isMulti: true,
};
