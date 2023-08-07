'use client';

import {
  selectActiveDbId,
  selectDatabases,
  selectProvider,
  setActiveDbId,
} from '@/store/kwil-slice';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import classNames from 'classnames';
import Image from 'next/image';
import { BeatLoader, RingLoader } from 'react-spinners';

export default function DesktopSidebar() {
  const provider = useAppSelector(selectProvider);
  const databases = useAppSelector(selectDatabases);
  const activeDbId = useAppSelector(selectActiveDbId);
  const dispatch = useAppDispatch();

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
              <BeatLoader loading={!provider || !databases} size={8} />
            </div>
          </div>

          {provider && databases && (
            <ul className="flex flex-col gap-2 text-sm text-center leading-6 text-gray-500">
              <li className="font-semibold">{provider?.alias}</li>
              <li>{provider?.url}</li>
              <li>{provider?.shortAddress}</li>
            </ul>
          )}
          <nav className="flex flex-1 flex-col mt-4">
            {provider && databases && (
              <div className="flex text-md justify-center leading-6 text-gray-500">
                <CircleStackIcon className="h-6 w-6 mr-2" />
                Databases
              </div>
            )}

            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {databases && databases.length === 0 && (
                <li className="text-xs text-gray-400">
                  No databases have been created
                </li>
              )}
              <li>
                <ul role="list" className="mt-3">
                  {databases &&
                    databases.map((item) => (
                      <li key={item.id}>
                        <a
                          onClick={() => {
                            dispatch(setActiveDbId(item.id));
                          }}
                          className={classNames({
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 cursor-pointer justify-center':
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
      </div>
    </>
  );
}
