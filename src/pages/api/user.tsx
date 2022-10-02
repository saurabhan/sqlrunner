import type { NextApiResponse } from 'next';

import prisma from '@/db/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(res: NextApiResponse) {
  const result = await prisma?.user_details.findMany({
    take: 50,
  });
  res.json(result);
}
