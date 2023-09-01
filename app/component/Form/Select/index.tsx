import { Options } from '@/app/types/input';
import React from 'react';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  inputLabel: string;
  options: Options[];
}

const Select = ({ inputLabel, options, ...rest }: Props) => {
  return (
    <div className='relative'>
      <p className='input-label'>{inputLabel}</p>
      <select className='input' {...rest}>
        <option value='' disabled>
          Select option
        </option>
        {options.map((option) => (
          <option value={option.value} id={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
