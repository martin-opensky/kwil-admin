'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectActiveDbId,
  setActiveDbId,
  setActiveDbSchema,
  setActiveTable,
  setDatabases,
} from '@/store/kwil-slice';
import { KwilAdminDatabase, KwilAdminSchema } from '@/lib/kwil-mutable-types';
import ActiveDatabase from '@/components/ActiveDatabase';

export default function Page() {
  const dispatch = useAppDispatch();
  const activeDbId = useAppSelector(selectActiveDbId);

  useEffect(() => {
    async function fetchDatabases() {
      const response = await fetch('/api/databases');

      if (response.ok) {
        const data = await response.json();
        const databases: KwilAdminDatabase[] = data.databases;

        dispatch(setDatabases(databases));

        if (databases.length > 0) {
          dispatch(setActiveDbId(databases[0].id));
        }
      }
    }

    fetchDatabases();
  }, [dispatch]);

  useEffect(() => {
    async function fetchDatabaseSchema() {
      if (!activeDbId) return;

      const response = await fetch(`/api/schema/${activeDbId}`);

      if (response.ok) {
        const schema: KwilAdminSchema = await response.json();

        dispatch(setActiveDbSchema(schema));

        if (schema.tables.length > 0) {
          dispatch(setActiveTable(schema.tables[0].name));
        }
      }
    }

    fetchDatabaseSchema();
  }, [dispatch, activeDbId]);

  return <>{<ActiveDatabase />}</>;
}
