//create rtk slice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { KwilAdminDatabase, KwilAdminSchema } from '../lib/kwil-mutable-types';

export interface KwilState {
  databases: KwilAdminDatabase[] | null;
  activeDbId: string | null;
  activeDbSchema: KwilAdminSchema | null;
  activeTable: string | null;
  tableData: Record<string, any>;
}

const initialState: KwilState = {
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
    setDatabases: (state, action: PayloadAction<KwilAdminDatabase[]>) => {
      state.databases = action.payload;
    },
    setActiveDbId: (state, action: PayloadAction<string>) => {
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
  setDatabases,
  setActiveDbId,
  setActiveDbSchema,
  setActiveTable,
  setTableData,
} = kwilSlice.actions;

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
