//create rtk slice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  KwilAdminDatabase,
  KwilAdminSchema,
  ProviderResponse,
} from '../lib/kwil-types';
export interface KwilState {
  provider: ProviderResponse | null;
  databases: KwilAdminDatabase[] | null;
  activeDbId: string | null;
  activeDbSchema: KwilAdminSchema | null;
  activeTable: string | null;
  tableData: Record<string, any>;
}

const initialState: KwilState = {
  provider: null,
  databases: null,
  activeDbId: null,
  activeDbSchema: null,
  activeTable: null,
  tableData: {},
};

export const kwilSlice = createSlice({
  name: 'kwil',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<ProviderResponse>) => {
      state.provider = action.payload;
    },
    setDatabases: (state, action: PayloadAction<KwilAdminDatabase[]>) => {
      state.databases = action.payload;
    },
    setActiveDbId: (state, action: PayloadAction<string>) => {
      if (state.activeDbId === action.payload) return;

      state.activeDbId = action.payload;
      state.activeTable = null; // clear active table when switching databases
      state.tableData = {}; // clear table data when switching databases
    },
    setActiveDbSchema: (state, action: PayloadAction<KwilAdminSchema>) => {
      state.activeDbSchema = action.payload;
    },
    setActiveTable: (state, action: PayloadAction<string>) => {
      state.activeTable = action.payload;
    },
    setTableData: (state, action: PayloadAction<any[]>) => {
      const name = state.activeTable;

      if (!name) return;

      state.tableData[name] = action.payload;
    },
  },
});

export const {
  setProvider,
  setDatabases,
  setActiveDbId,
  setActiveDbSchema,
  setActiveTable,
  setTableData,
} = kwilSlice.actions;

export const selectProvider = (state: RootState) => state.kwil.provider;
export const selectDatabases = (state: RootState) => state.kwil.databases;
export const selectActiveDbId = (state: RootState) => state.kwil.activeDbId;
export const selectActiveDbSchema = (state: RootState) =>
  state.kwil.activeDbSchema;
export const selectActiveTable = (state: RootState) => state.kwil.activeTable;
export const selectActiveTableColumns = (state: RootState) => {
  const table = state.kwil.activeDbSchema?.tables.find(
    (table) => table.name === state.kwil.activeTable
  );

  return table?.columns;
};
export const selectTableData = (state: RootState) => {
  if (!state.kwil.activeTable) return null;

  return state.kwil.tableData[state.kwil.activeTable];
};

export default kwilSlice.reducer;
