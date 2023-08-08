'use client';

import {
  selectActiveDbId,
  selectDatabases,
  selectProvider,
  selectProviderError,
  setActiveDbId,
} from '@/store/kwil-slice';
import {
  CircleStackIcon,
  PlusCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import classNames from 'classnames';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';

export default function DesktopSidebar() {
  const provider = useAppSelector(selectProvider);
  const providerError = useAppSelector(selectProviderError);
  const databases = useAppSelector(selectDatabases);
  const activeDbId = useAppSelector(selectActiveDbId);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-6 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex flex-col shrink-0 items-center mt-4">
            <Image
              src="/kwil-admin.png"
              alt="Kwil Logo"
              width={150}
              height={150}
            />
            <div className="flex flex-col text-center">
              <BeatLoader loading={!databases && !providerError} size={8} />
            </div>
          </div>

          {provider && (
            <ul className="flex flex-col gap-2 text-sm text-center leading-6 text-gray-500">
              <li className="font-semibold">{provider?.alias}</li>
              <li>{provider?.url}</li>
              <li>{provider?.shortAddress}</li>
            </ul>
          )}

          {providerError && (
            <ul className="text-xs text-red-400 text-center">
              Could not connect to provider
            </ul>
          )}

          <nav className="flex flex-1 flex-col mt-4">
            {!providerError && provider && databases && (
              <div className="flex text-md justify-center leading-6 text-gray-500">
                <CircleStackIcon className="h-6 w-6 mr-2" />
                Databases
              </div>
            )}

            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {!providerError && databases && databases.length === 0 && (
                <li className="text-xs text-gray-400 text-center mt-4">
                  No databases have been created
                </li>
              )}
              <li>
                {!providerError && databases && (
                  <ul role="list" className="mt-3">
                    {databases.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/database/${item.id}`}
                          onClick={() => {
                            dispatch(setActiveDbId(item.id));
                          }}
                          className={classNames({
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 cursor-pointer justify-center':
                              true,
                            'bg-gray-50 text-kwil':
                              item.id === activeDbId && pathname !== '/create',
                            'text-gray-700 hover:text-kwil hover:bg-gray-50':
                              item.id !== activeDbId,
                          })}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    {/* <li>
                      <Link
                        href={`/create`}
                        onClick={() => {
                          dispatch(setActiveDbId(null));
                        }}
                        className={classNames({
                          'group flex rounded-md p-2 text-sm leading-6 cursor-pointer justify-center':
                            true,
                          'bg-gray-50 text-kwil': pathname === '/create',
                          'text-gray-700 hover:text-kwil hover:bg-gray-50':
                            pathname !== '/create',
                        })}
                      >
                        create <PlusCircleIcon className="ml-1 h-6 w-6" />
                      </Link>
                    </li> */}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
