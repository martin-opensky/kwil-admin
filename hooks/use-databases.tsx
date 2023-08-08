import { KwilAdminDatabase } from '@/lib/kwil-types';
import { useAppDispatch } from '@/store/hooks';
import {
  setActiveDbId,
  setDatabases,
  setProviderError,
} from '@/store/kwil-slice';
import React, { useEffect } from 'react';

export default function useDatabase() {
  const dispatch = useAppDispatch();
  const [_databases, _setDatabases] = React.useState<KwilAdminDatabase[]>([]);

  useEffect(() => {
    async function fetchDatabases() {
      const response = await fetch('/api/databases');

      if (response.ok) {
        const data = await response.json();
        const databases: KwilAdminDatabase[] = data.databases;

        _setDatabases(databases);

        dispatch(setDatabases(databases));
        dispatch(setProviderError(false));
      } else {
        console.log('error fetching databases');
        dispatch(setProviderError(true));
      }
    }

    fetchDatabases();
  }, [dispatch]);

  return { databases: _databases };
}
