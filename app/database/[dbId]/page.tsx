'use client';

import useDatabase from '@/hooks/use-databases';
import useSchema from '@/hooks/use-schema';
import useKwilProvider from '@/hooks/use-kwil-provider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { setActiveDbId, setActiveTable } from '@/store/kwil-slice';
import ActiveDatabase from '@/components/ActiveDatabase';

export default function Page({ params }: any) {
  useKwilProvider();
  const { databases } = useDatabase();
  const { schema } = useSchema();
  const dispatch = useAppDispatch();

  dispatch(setActiveDbId(params.dbId));

  if (schema && schema.tables.length > 0) {
    dispatch(setActiveTable(schema.tables[0].name));
  }

  return (
    <>
      <ActiveDatabase />
    </>
  );
}
