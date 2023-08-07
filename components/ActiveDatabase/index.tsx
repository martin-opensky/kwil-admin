import { useAppSelector } from '@/store/hooks';
import { selectActiveDbSchema, selectActiveTable } from '@/store/kwil-slice';
import Tabs from './Tabs';
import Table from './Table';
import Actions from './Actions';
import ActionModal from './ActionModal';

export default function ActiveDatabase() {
  const schema = useAppSelector(selectActiveDbSchema);
  const activeTable = useAppSelector(selectActiveTable);

  return (
    <>
      {schema && activeTable && (
        <>
          <div className="flex flex-col gap-6">
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
        </>
      )}
    </>
  );
}
