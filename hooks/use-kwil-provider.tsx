import { ProviderResponse } from '@/lib/kwil-types';
import { useAppDispatch } from '@/store/hooks';
import { setProvider } from '@/store/kwil-slice';
import React, { useEffect } from 'react';

export default function useKwilProvider() {
  const dispatch = useAppDispatch();

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
}
