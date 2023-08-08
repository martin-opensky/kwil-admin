import { useAppSelector } from '@/store/hooks';
import { selectActiveDbSchema, selectActiveTable } from '@/store/kwil-slice';
import Tabs from './Tabs';
import Table from './Table';
import Actions from './Actions';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import InfoModal from './InfoModal';
import { useState } from 'react';

export default function ActiveDatabase() {
  const [open, setOpen] = useState<boolean>(false);
  const schema = useAppSelector(selectActiveDbSchema);
  const activeTable = useAppSelector(selectActiveTable);

  return (
    // <div >{children}</div>

    <div className="py-6">
      {schema && activeTable && (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="absolute top-5 right-8">
              <Cog8ToothIcon
                className="w-6 h-6 text-kwil cursor-pointer"
                onClick={() => {
                  setOpen(true);
                }}
              />
            </div>
            <Tabs />
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="visible lg:hidden">
                <Actions />
              </div>
              <div className="lg:w-5/6">
                <Table />
              </div>
              <div className="lg:w-1/6">
                <Actions />
              </div>
            </div>
          </div>
          <InfoModal open={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  );
}
