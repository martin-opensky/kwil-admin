import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { Utils } from 'kwil';
import KwilSchema from '@/lib/kwil-schema';

// Next js api route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { dbId } = req.query;

  const kwilSchema = new KwilSchema(dbId as string);

  res.status(200).json(await kwilSchema.get());
}
