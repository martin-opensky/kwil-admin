export type KwilAdminDatabase = {
  id: string;
  name: string;
};

export type KwilAdminSchema = {
  name: string;
  tables: Table<string>[];
  actions: ActionSchema[];
};

export type ProviderResponse = {
  alias: string;
  shortAddress: string;
  address: string;
  url: string;
};

// NOTE: This is a copy of the Kwil Schema types with the readonly properties removed
export type ValueType = string | number | null;
export declare enum DataType {
  NULL = 'NULL',
  TEXT = 'TEXT',
  INT = 'INT',
}
export declare enum AttributeType {
  PRIMARY_KEY = 'PRIMARY_KEY',
  UNIQUE = 'UNIQUE',
  NOT_NULL = 'NOT_NULL',
  DEFAULT = 'DEFAULT',
  MIN = 'MIN',
  MAX = 'MAX',
  MIN_LENGTH = 'MIN_LENGTH',
  MAX_LENGTH = 'MAX_LENGTH',
}
export declare enum IndexType {
  BTREE = 'BTREE',
  UNIQUE_BTREE = 'UNIQUE_BTREE',
}
export interface Database<T> {
  get name(): string;
  get owner(): string;
  get tables(): Table<T>;
  get actions(): ActionSchema;
}
export interface Table<T> {
  get name(): string;
  get columns(): Column<T>[]; // TODO: Had to convert this to array to get it to work
  get indexes(): Index;
}
export interface Column<T> {
  get name(): string;
  get type(): DataType;
  get attributes(): Attribute<T>;
}
export interface Attribute<T> {
  get type(): AttributeType;
  get value(): T;
}
export interface Index {
  get name(): string;
  get columns(): string;
  get type(): IndexType;
}
export interface ActionSchema {
  get name(): string;
  get public(): boolean;
  get inputs(): string;
  get statements(): string;
}
export interface SelectQuery {
  get dbid(): string;
  get query(): string;
}
