import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
type Props = {
  show: boolean;
  showModalTitle: boolean;
  title?: any;
  content: React.ReactNode;
  showButtons?: any;
  buttonComponent?: any;
  onClose: () => void;
};

const Modal = ({
  title,
  onClose,
  showModalTitle,
  show,
  buttonComponent,
  content,
  showButtons,
}: Props) => {
  return (
    <Transition.Root show={show} as={React.Fragment}>
      <Dialog onClose={onClose} as='div' className='relative z-10'>
        <Transition.Child
          as={React.Fragment}
          enter='ease-in-out duration-900'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden '>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={React.Fragment}
                enter='ease-in-out duration-900'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-500'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Dialog.Panel className='w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      {showModalTitle && (
                        <div className='flex items-start justify-between'>
                          <Dialog.Title>{title}</Dialog.Title>
                        </div>
                      )}

                      <div className='mt-16'>{content}</div>
                    </div>
                    {showButtons && (
                      <div className='border-t border-gray-300 px-4 py-6 sm:px-6'>
                        {buttonComponent}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
