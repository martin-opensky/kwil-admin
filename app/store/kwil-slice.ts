//create rtk slice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type Database = {
  id: string;
  name: string;
};

export interface KwilState {
  databases: Database[];
  currentDbId: string | null;
}

const initialState: KwilState = {
  databases: [],
  currentDbId: null,
};

export const kwilSlice = createSlice({
  name: 'kwil',
  initialState,
  reducers: {
    setDatabases: (state) => {
      state.databases = [];
    },
  },
});

export const { setDatabases } = kwilSlice.actions;

export const selectDatabases = (state: RootState) => state.kwil.databases;
export const selectCurrentDbId = (state: RootState) => state.kwil.currentDbId;

export default kwilSlice.reducer;
