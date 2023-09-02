import { ADMIN_NAV_OPTIONS, NAV_OPTIONS } from '@/app/consts';
import { GlobalContext } from '@/context';
import useMediaQuery from '@/hooks/useMediaQuery';
import { NavOptions } from '@/types/navigation';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

type Props = {
  show: boolean;
  isAdminView: boolean;
};

const NavItems = ({ isAdminView, show }: Props) => {
  const { setShowNavModal } = useContext(GlobalContext);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const router = useRouter();

  const navigateTo = (path: string) => {
    setShowNavModal(false);
    router.push(path);
  };

  const renderNavigationItems = <T extends NavOptions>(options: T[]) => {
    return options.map((option) => (
      <li
        onClick={() => navigateTo(option.path)}
        key={option.id}
        className='cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0'
      >
        {option.label}
      </li>
    ));
  };

  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        show ? '' : 'hidden'
      }`}
      id='nav-items'
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isSmallScreen ? '' : 'border border-gray-100'
        }`}
      >
        {isAdminView
          ? renderNavigationItems(ADMIN_NAV_OPTIONS)
          : renderNavigationItems(NAV_OPTIONS)}
      </ul>
    </div>
  );
};

export default NavItems;
