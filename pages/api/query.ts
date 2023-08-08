import { NodeKwil } from 'kwil';
import { NextApiResponse, NextApiRequest } from 'next';

// Next js api route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { dbId, query } = JSON.parse(req.body);

    console.log(dbId, query, req.body);

    try {
      const kwil: NodeKwil = new NodeKwil({
        kwilProvider: process.env.KWIL_ADMIN_PROVIDER_URL as string,
      });
      const result = await kwil.selectQuery(dbId, query);

      console.log(result);

      if (result.status !== 200) {
        return res.status(400).json({ error: 'Problem with query' });
      }

      return res.status(200).json(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  res.status(400).json({ error: 'Problem with query' });
}
