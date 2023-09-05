import { PulseLoader } from 'react-spinners';

type Props = {
  loading: boolean;
};

export default function Loading({ loading }: Props) {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <PulseLoader
        color={'#000000'}
        loading={loading}
        size={30}
        data-testid='loader'
      />
    </div>
  );
}
