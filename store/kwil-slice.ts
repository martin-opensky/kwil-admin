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
  providerError: boolean;
  databases: KwilAdminDatabase[] | null;
  activeDbId: string | null;
  activeDbSchema: KwilAdminSchema | null;
  activeTable: string | null;
  tableData: Record<string, any>;
  activeAction: string | null;
}

const initialState: KwilState = {
  provider: null,
  providerError: false,
  databases: null,
  activeDbId: null,
  activeDbSchema: null,
  activeTable: null,
  tableData: {},
  activeAction: null,
};

export const kwilSlice = createSlice({
  name: 'kwil',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<ProviderResponse>) => {
      state.provider = action.payload;
    },
    setProviderError: (state, action: PayloadAction<boolean>) => {
      state.providerError = action.payload;
    },
    setDatabases: (state, action: PayloadAction<KwilAdminDatabase[]>) => {
      state.databases = action.payload;
    },
    setActiveDbId: (state, action: PayloadAction<string>) => {
      if (state.activeDbId === action.payload) return;

      state.activeTable = null; // clear active table when switching databases
      state.tableData = {}; // clear table data when switching databases
      state.activeAction = null;
      state.activeDbId = action.payload;
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
    setActiveAction: (state, action: PayloadAction<string | null>) => {
      state.activeAction = action.payload;
    },
  },
});

export const {
  setProvider,
  setProviderError,
  setDatabases,
  setActiveDbId,
  setActiveDbSchema,
  setActiveTable,
  setTableData,
  setActiveAction,
} = kwilSlice.actions;

export const selectProvider = (state: RootState) => state.kwil.provider;
export const selectProviderError = (state: RootState) =>
  state.kwil.providerError;

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

export const selectActiveAction = (state: RootState) => {
  const action = state.kwil.activeDbSchema?.actions.find(
    (action) => action.name === state.kwil.activeAction
  );

  return action;
};

export default kwilSlice.reducer;
