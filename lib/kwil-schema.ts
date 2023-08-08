import { NodeKwil } from 'kwil';
import { ActionSchema, Database, Table } from 'kwil/dist/core/database';

type KwilAdminSchema = {
  name: string;
  tables: readonly Table<string>[];
  actions: readonly ActionSchema[];
};

export default class KwilSchema {
  kwil: NodeKwil;
  dbId: string;
  schema: Database<string> | undefined;
  name: string | undefined; // database name
  tables: readonly Table<string>[] = [];
  actions: readonly ActionSchema[] = [];
  kwilAdminSchema: KwilAdminSchema | undefined;

  constructor(dbId: string) {
    this.kwil = new NodeKwil({
      kwilProvider: process.env.KWIL_PROVIDER_URL as string,
    });

    this.dbId = dbId;
  }

  async get(): Promise<KwilAdminSchema> {
    try {
      return await this.getSchema();
    } catch (error) {
      console.log('Error => ', error);
      throw error;
    }
  }

  private async getSchema() {
    const schema = await this.kwil.getSchema(this.dbId);

    if (!schema.data) {
      throw new Error('No schema data found');
    }

    this.schema = schema.data;

    this.name = this.schema.name;
    this.tables = this.schema.tables;
    this.actions = this.schema.actions;

    // @ts-ignore
    this.actions = this.actions.sort((a, b) => {
      if (a.name < b.name) return -1;

      if (a.name > b.name) return 1;

      return 0;
    });

    console.log(this.actions);

    return {
      name: this.name,
      tables: this.tables,
      actions: this.actions,
    };
  }
}
