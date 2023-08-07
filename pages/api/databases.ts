import {  NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { Utils } from 'kwil';

type DatabaseResponse = {
  databases: string[];
};

type KwilDatabase = {
  id: string;
  name: string;
};

// Next js api route
export default async function handler(
  req: Request,
  res: NextApiResponse
) {
  const call = await fetch(
    'http://localhost:8080/api/v1/0x1BAB009913b7Ec9a4fd33c79ea918F03C562B877/databases'
  );

  if (!call.ok) return res.status(500).json({ error: 'Something went wrong' });

  const json: DatabaseResponse = (await call.json()) as DatabaseResponse;

  const databases: KwilDatabase[] = [];
  for (const database of json.databases) {
    // Need to connect to Kwil DB and bu
    const dbId = Utils.generateDBID(
      '0x1BAB009913b7Ec9a4fd33c79ea918F03C562B877',
      database
    );

    databases.push({ id: dbId, name: database });
  }

  res.status(200).json({ databases });
}
