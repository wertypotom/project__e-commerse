'use client';

import { Options } from '@/types/input';

type Props = {
  onClick: (value: Options) => void;
  data: Options[];
  selected: Options[];
};

const Tiles = ({ data, selected, onClick }: Props) => {
  return (
    <div className='mt-3 flex flex-wrap items-center gap-1'>
      {data.map((item) => (
        <label
          onClick={() => onClick(item)}
          className={`cursor-pointer hover:bg-black transition-all ${
            selected.map((item) => item.value).indexOf(item.value) !== -1
              ? 'bg-black'
              : ''
          }`}
          key={item.value}
        >
          <span
            className={`rounded-lg border border-black px-6 py-2 font-bold hover:text-white transition-all ${
              selected.map((item) => item.value).indexOf(item.value) !== -1
                ? 'text-white'
                : ''
            }`}
          >
            {item.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default Tiles;
