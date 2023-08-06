'use client';

import { selectCurrentDbId, selectDatabases } from '@/app/store/kwil-slice';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useSelector } from 'react-redux';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DesktopSidebar() {
  const databases = useSelector(selectDatabases);
  const currentDbId = useSelector(selectCurrentDbId);

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center"></div>
          <nav className="flex flex-1 flex-col">
            <div className="text-md leading-6 text-gray-500">Databases</div>
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {databases.length === 0 && (
                <li className="text-xs text-gray-400">
                  No databases have been created
                </li>
              )}
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {databases.map((item) => (
                    <li key={item.id}>
                      <a
                        className={classNames(
                          item.id === currentDbId
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <CircleStackIcon
                          className={classNames(
                            item.id === currentDbId
                              ? 'text-indigo-600'
                              : 'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
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
