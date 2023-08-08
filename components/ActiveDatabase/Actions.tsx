import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectActiveDbSchema, setActiveAction } from '@/store/kwil-slice';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import React from 'react';
import ActionModal from './ActionModal';

export default function Actions() {
  const dispatch = useAppDispatch();
  const schema = useAppSelector(selectActiveDbSchema);

  const actions = schema?.actions;

  return (
    <>
      <div className="flex flex-wrap gap-4 ml-4 justify-center">
        <div className="flex text-md justify-center leading-6 text-gray-500">
          <CodeBracketIcon className="h-6 w-6 mr-2" />
          Actions
        </div>
        <div className="flex flex-row lg:flex-col gap-2">
          {actions &&
            actions?.map((action, i) => (
              <div
                key={i}
                className="px-4 py-2 text-sm font-medium text-kwil bg-kwil/10 rounded-md cursor-pointer text-center"
                onClick={() => {
                  dispatch(setActiveAction(action.name));
                }}
              >
                {action.name}
              </div>
            ))}
        </div>
      </div>
      <ActionModal />
    </>
  );
}
