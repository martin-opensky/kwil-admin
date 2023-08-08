'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectActiveDbId,
  setActiveDbId,
  setActiveTable,
} from '@/store/kwil-slice';

import ActiveDatabase from '@/components/ActiveDatabase';
import useKwilProvider from '@/hooks/use-kwil-provider';
import useDatabase from '@/hooks/use-databases';
import useSchema from '@/hooks/use-schema';

export default function Page() {
  useKwilProvider();
  const dispatch = useAppDispatch();
  const { databases } = useDatabase();
  const { schema } = useSchema();

  if (databases.length > 0) {
    dispatch(setActiveDbId(databases[0].id));
  }

  if (schema && schema.tables.length > 0) {
    dispatch(setActiveTable(schema.tables[0].name));
  }

  return (
    <>
      <ActiveDatabase />
    </>
  );
}
