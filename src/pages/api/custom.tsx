import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/db/prisma';
// const prisma = new PrismaClient();

// POST /api/user
// Required fields in body: name, email
export default async function custom(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { query } = req.body;
    let sql = Prisma.sql``;

    switch (query) {
      case 1:
        sql = Prisma.sql`Select * from user_details where "last_name" = "john";`;
        break;
      case 2:
        sql = Prisma.sql`Select * from user_details where first_name = "john";`;
        break;
      case 3:
        sql = Prisma.sql`Select * from user_details limit 5`;
        break;
      case 4:
        sql = Prisma.sql`Select * from user_details order by first_name desc limit 10;`;
        break;

      default:
        sql = Prisma.sql`Select * from user_details limit 2000;`;

        break;
    }
    const result = await prisma.$queryRaw(sql);

    res.send(result);
  }
}
