import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
}

const Input = ({ inputLabel, ...rest }: Props) => {
  return (
    <div className='relative'>
      <p className='input-label'>{inputLabel}</p>
      <input {...rest} className='input' />
    </div>
  );
};

export default Input;
