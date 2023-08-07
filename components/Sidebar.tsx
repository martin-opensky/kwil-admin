'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CircleStackIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectActiveDbId,
  selectDatabases,
  setActiveDbId,
} from '@/store/kwil-slice';
import classNames from 'classnames';

export default function Sidebar() {
  const databases = useAppSelector(selectDatabases);
  const activeDbId = useAppSelector(selectActiveDbId);
  const dispatch = useAppDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center"></div>
                  <nav className="flex flex-1 flex-col">
                    <div className="flex text-md leading-6 text-gray-400">
                      <CircleStackIcon className="h-6 w-6 mr-2" /> Databases
                    </div>
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      {databases && databases.length === 0 && (
                        <li className="text-xs text-gray-400">
                          No databases have been created
                        </li>
                      )}
                      <li>
                        <ul role="list" className="mt-2">
                          {databases &&
                            databases.map((item) => (
                              <li key={item.name}>
                                <a
                                  onClick={() => {
                                    dispatch(setActiveDbId(item.id));
                                    setSidebarOpen(false);
                                  }}
                                  className={classNames({
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 pl-8 cursor-pointer':
                                      true,
                                    'bg-gray-50 text-indigo-600':
                                      item.id === activeDbId,
                                    'text-gray-700 hover:text-indigo-600 hover:bg-gray-50':
                                      item.id !== activeDbId,
                                  })}
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Dashboard
        </div>
        <a href="#">
          <span className="sr-only">Your profile</span>
        </a>
      </div>
    </>
  );
}
