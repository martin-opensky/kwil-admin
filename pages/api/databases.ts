import { NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { Utils } from 'kwil';
import { Wallet } from 'ethers';

type DatabaseResponse = {
  databases: string[];
};

type KwilDatabase = {
  id: string;
  name: string;
};

if (!process.env.ADMIN_PRIVATE_KEY)
  throw new Error('ADMIN_PRIVATE_KEY not set');
if (!process.env.KWIL_PROVIDER_URL)
  throw new Error('KWIL_PROVIDER_URL not set');

// Next js api route
export default async function handler(req: Request, res: NextApiResponse) {
  const kwilProviderUrl = process.env.KWIL_PROVIDER_URL as string;
  const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY as string;
  const signer = new Wallet(adminPrivateKey);
  const providerAddress = await signer.getAddress();

  const call = await fetch(
    `${kwilProviderUrl}/api/v1/${providerAddress}/databases`
  );

  if (!call.ok) return res.status(500).json({ error: 'Something went wrong' });

  const json: DatabaseResponse = (await call.json()) as DatabaseResponse;

  const databases: KwilDatabase[] = [];
  for (const database of json.databases) {
    // Need to connect to Kwil DB and bu
    const dbId = Utils.generateDBID(providerAddress, database);

    databases.push({ id: dbId, name: database });
  }

  res.status(200).json({ databases });
}
