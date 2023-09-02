export type FormControlFields = {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: 'select' | 'input';
  options?: Options[];
};

export type Options = {
  value: string;
  label: string;
};
