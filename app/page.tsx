'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectActiveDbId,
  setActiveDbId,
  setActiveDbSchema,
  setActiveTable,
  setDatabases,
  setProvider,
  setProviderError,
} from '@/store/kwil-slice';
import {
  KwilAdminDatabase,
  KwilAdminSchema,
  ProviderResponse,
} from '@/lib/kwil-types';
import ActiveDatabase from '@/components/ActiveDatabase';

export default function Page() {
  const dispatch = useAppDispatch();
  const activeDbId = useAppSelector(selectActiveDbId);
  const dbInterval = useRef<any>(null);

  useEffect(() => {
    async function fetchProvider() {
      const response = await fetch('/api/provider');

      if (response.ok) {
        const data: ProviderResponse = await response.json();

        dispatch(setProvider(data));
      }
    }

    fetchProvider();
  }, [dispatch]);

  useEffect(() => {
    async function fetchDatabases() {
      const response = await fetch('/api/databases');

      if (response.ok) {
        const data = await response.json();
        const databases: KwilAdminDatabase[] = data.databases;

        dispatch(setDatabases(databases));
        dispatch(setProviderError(false));

        if (databases.length > 0) {
          dispatch(setActiveDbId(databases[0].id));
        }
      } else {
        console.log('error fetching databases');
        dispatch(setProviderError(true));
      }
    }

    fetchDatabases();

    dbInterval.current = setInterval(() => {
      fetchDatabases();
    }, 5000);

    return () => {
      clearInterval(dbInterval.current);
    };
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
