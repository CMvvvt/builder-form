export interface FormData {
  label: string;
  required: boolean;
  choices: string[];
  displayAlpha: boolean;
  default: string;
}

export const initialFormData = {
  label: '',
  required: false,
  choices: [],
  displayAlpha: false,
  default: '',
};
