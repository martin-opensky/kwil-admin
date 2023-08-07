import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectActiveDbId,
  selectActiveDbSchema,
  selectActiveTable,
  selectActiveTableColumns,
  selectTableData,
  setTableData,
} from '@/store/kwil-slice';
import { useEffect, useRef } from 'react';

export default function Table() {
  const dispatch = useAppDispatch();
  const schema = useAppSelector(selectActiveDbSchema);
  const activeTable = useAppSelector(selectActiveTable);
  const activeDbId = useAppSelector(selectActiveDbId);
  const columns = useAppSelector(selectActiveTableColumns);
  const tableData = useAppSelector(selectTableData);
  const interval = useRef<any>(null);

  useEffect(() => {
    // TODO: request duplicated due to multiple dependencies being updated
    async function fetchTableData() {
      if (!activeDbId || !activeTable) return;

      const response = await fetch(`/api/query`, {
        method: 'POST',
        body: JSON.stringify({
          dbId: activeDbId,
          query: `SELECT * FROM ${activeTable}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        dispatch(setTableData(data));
      }
    }
    fetchTableData();

    interval.current = setInterval(() => {
      fetchTableData();
    }, 3000);

    return () => {
      clearInterval(interval.current);
    };
  }, [activeDbId, activeTable, dispatch]);

  if (!schema || !activeTable) return null;

  if (tableData && !tableData.length) {
    return <div className="mt-4 text-red-400">No table data</div>;
  }

  return (
    <div className="px-4 sm:px-4 lg:px-6">
      <div className="mt-0 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle px-2">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {columns &&
                      columns.map((column) => (
                        <th
                          key={column.name}
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {column.name}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tableData &&
                    tableData.map((row: any) => (
                      <tr key={row.id}>
                        {columns &&
                          columns.map((column) => (
                            <td
                              key={column.name}
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                            >
                              {row[column.name]}
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
