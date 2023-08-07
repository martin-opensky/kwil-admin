import { Wallet } from 'ethers';
import { NodeKwil, Utils } from 'kwil';
import { NextApiResponse, NextApiRequest } from 'next';

type ErrorResponse = {
  code: number;
  message: string;
  data: any;
};

if (!process.env.ADMIN_PRIVATE_KEY)
  throw new Error('ADMIN_PRIVATE_KEY not set');
if (!process.env.KWIL_PROVIDER_URL)
  throw new Error('KWIL_PROVIDER_URL not set');

// Next js api route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const kwilProviderUrl = process.env.KWIL_PROVIDER_URL as string;
    const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY as string;
    const signer = new Wallet(adminPrivateKey);
    const { dbId, name, values } = JSON.parse(req.body);

    console.log(dbId, name, values);

    const kwil: NodeKwil = new NodeKwil({
      kwilProvider: kwilProviderUrl,
    });

    const actionInputs = new Utils.ActionInput();

    for (const [key, value] of Object.entries(values)) {
      actionInputs.put(key, value as string);
    }

    try {
      const actionTx = await kwil
        .actionBuilder()
        .dbid(dbId)
        .name(name)
        .concat(actionInputs)
        .signer(signer)
        .buildTx();

      const actionResult = await kwil.broadcast(actionTx);

      if (actionResult.status === 200) {
        res.status(200).json({ status: 'success', data: actionResult.data });
      }
    } catch (e: any) {
      res.status(400).json({ status: 'failed', error: e });
    }
  }
}
