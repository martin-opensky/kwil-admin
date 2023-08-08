import { KwilAdminSchema } from '@/lib/kwil-types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectActiveDbId, setActiveDbSchema } from '@/store/kwil-slice';
import React, { useEffect } from 'react';

export default function useSchema() {
  const activeDbId = useAppSelector(selectActiveDbId);
  const dispatch = useAppDispatch();
  const [_schema, _setSchema] = React.useState<KwilAdminSchema | null>(null);

  useEffect(() => {
    async function fetchDatabaseSchema() {
      if (!activeDbId) return;

      const response = await fetch(`/api/schema/${activeDbId}`);

      if (response.ok) {
        const schema: KwilAdminSchema = await response.json();
        _setSchema(schema);
        dispatch(setActiveDbSchema(schema));
      }
    }

    fetchDatabaseSchema();
  }, [dispatch, activeDbId]);

  return { schema: _schema };
}
