import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import classNames from 'classnames';
import { selectActiveDbId, selectDbName } from '@/store/kwil-slice';
import { useAppSelector } from '@/store/hooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function InfoModal({ open, setOpen }: Props) {
  const activeDbId = useAppSelector(selectActiveDbId);
  const activeDbName = useAppSelector(selectDbName);

  const close = () => {
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {}}
        autoFocus={false}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-200/30 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex justify-center p-4 text-center sm:items-start sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames({
                  'relative transform overflow-hidden w-full rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 sm:w-1/3':
                    true,
                })}
              >
                <div className="flex flex-col gap-4">
                  <div className="text-lg text-gray-600">
                    Database Information
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <div className="text-md text-kwil">Name</div>
                      <div className="text-sm text-gray-800">
                        {activeDbName}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-md text-kwil">Database Id</div>
                      <div className=" flex text-sm text-gray-800">
                        {activeDbId}
                        <CopyToClipboard text={activeDbId as string}>
                          <DocumentDuplicateIcon className="h-5 w-5 ml-1 cursor-pointer hover:text-kwil active:text-kwil/40" />
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-kwil/80 shadow-sm outline outline-1 outline-kwil/80 hover:bg-kwil/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kwil/80"
                      onClick={() => close()}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
