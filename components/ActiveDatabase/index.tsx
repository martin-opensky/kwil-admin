import { useAppSelector } from '@/store/hooks';
import { selectActiveDbSchema, selectActiveTable } from '@/store/kwil-slice';
import Tabs from './Tabs';
import Table from '../Table';

export default function ActiveDatabase() {
  const schema = useAppSelector(selectActiveDbSchema);
  const activeTable = useAppSelector(selectActiveTable);

  return (
    <>
      {schema && activeTable && (
        <>
          <Tabs />
          <Table />
        </>
      )}
    </>
  );
}
