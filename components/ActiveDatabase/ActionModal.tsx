import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectActiveAction, setActiveAction } from '@/store/kwil-slice';
import classNames from 'classnames';

export default function ActionModal() {
  const dispatch = useAppDispatch();
  const activeAction = useAppSelector(selectActiveAction);

  return (
    <Transition.Root show={activeAction !== undefined} as={Fragment}>
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
          <div className="fixed inset-0 bg-kwil/10 bg-opacity-75 transition-opacity" />
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
                  'relative transform overflow-hidden w-full rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 md:w-1/3':
                    true,
                  hidden: !activeAction,
                })}
              >
                <div className="flex flex-col gap-4">
                  <div className="text-md text-gray-600">
                    {activeAction?.name}
                  </div>
                  <div className="flex flex-col gap-2 text-md text-gray-600">
                    {activeAction &&
                      activeAction.inputs &&
                      activeAction.inputs.map((input) => (
                        <>
                          <div className="isolate -space-y-px rounded-md shadow-sm z-50">
                            <div className="relative rounded-md  pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-kwil">
                              <label
                                htmlFor="name"
                                className="block px-3 text-xs font-medium text-gray-900"
                              >
                                {input}
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="block p-1 ml-2 w-[95%] border-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                  <div className="flex flex-row gap-4">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-kwil/80 shadow-sm outline outline-1 outline-kwil/80 hover:bg-kwil/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kwil/80"
                      onClick={() => dispatch(setActiveAction(null))}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-kwil/80 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-kwil focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kwil/80"
                      onClick={() => alert('execute')}
                    >
                      Execute
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