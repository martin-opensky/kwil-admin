import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectActiveDbSchema,
  selectActiveTable,
  setActiveTable,
} from '@/store/kwil-slice';
import classNames from 'classnames';
import React from 'react';

export default function Tabs() {
  const dispatch = useAppDispatch();
  const schema = useAppSelector(selectActiveDbSchema);
  const activeTable = useAppSelector(selectActiveTable);
  const tables = schema?.tables;

  const setTable = (table: string) => {
    dispatch(setActiveTable(table));
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          onChange={(e) => setTable(e.currentTarget.value)}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tables && tables.find((table) => table.name)?.name}
        >
          {tables &&
            tables.map((table) => (
              <option key={table.name} selected={table.name === activeTable}>
                {table.name}
              </option>
            ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tables &&
            tables.map((table) => (
              <a
                key={table.name}
                onClick={() => setTable(table.name)}
                className={classNames({
                  'rounded-md px-3 py-2 text-sm font-medium cursor-pointer':
                    true,
                  'bg-indigo-100 text-indigo-700': table.name === activeTable,
                  'text-gray-500 hover:text-gray-700':
                    table.name !== activeTable,
                })}
              >
                {table.name}
              </a>
            ))}
        </nav>
      </div>
    </div>
  );
}
