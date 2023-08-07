'use client';

import {
  selectActiveDbId,
  selectDatabases,
  setActiveDbId,
} from '@/store/kwil-slice';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import classNames from 'classnames';

export default function DesktopSidebar() {
  const databases = useAppSelector(selectDatabases);
  const activeDbId = useAppSelector(selectActiveDbId);
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center"></div>
          <nav className="flex flex-1 flex-col">
            <div className="flex text-md leading-6 text-gray-500">
              <CircleStackIcon className="h-6 w-6 mr-2" />
              Databases
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
                      <li key={item.id}>
                        <a
                          onClick={() => {
                            dispatch(setActiveDbId(item.id));
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
      </div>
    </>
  );
}
