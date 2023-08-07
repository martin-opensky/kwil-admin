import { NextApiResponse } from 'next';
import { Wallet } from 'ethers';
import { ProviderResponse } from '@/lib/kwil-types';

if (!process.env.ADMIN_PRIVATE_KEY)
  throw new Error('ADMIN_PRIVATE_KEY not set');
if (!process.env.KWIL_PROVIDER_URL)
  throw new Error('KWIL_PROVIDER_URL not set');
if (!process.env.PROVIDER_ALIAS) throw new Error('PROVIDER_ALIAS not set');

// Next js api route
export default async function handler(req: Request, res: NextApiResponse) {
  const url = process.env.KWIL_PROVIDER_URL as string;
  const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY as string;
  const alias = process.env.PROVIDER_ALIAS as string;

  const signer = new Wallet(adminPrivateKey);
  const address = await signer.getAddress();

  const addressStart = address.slice(0, 6);
  const addressEnd = address.slice(-6);

  const response: ProviderResponse = {
    alias,
    shortAddress: `${addressStart}...${addressEnd}`,
    address,
    url,
  };

  res.status(200).json(response);
}
