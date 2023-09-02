export interface BaseFormControlFields {
  id: string;
  placeholder: string;
  label: string;
}

export interface InputControlFields extends BaseFormControlFields {
  componentType: 'input';
  type: string;
}

export interface SelectControlFields extends BaseFormControlFields {
  componentType: 'select';
  options: Options[];
}

export type FormControlFields = InputControlFields | SelectControlFields;

export type Options = {
  value: string;
  label: string;
};
