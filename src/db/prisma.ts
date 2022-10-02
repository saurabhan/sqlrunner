import { PrismaClient } from '@prisma/client';

declare const global: Global & { prisma?: PrismaClient };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
// eslint-disable-next-line
BigInt.prototype.toJSON = function (): number {
  return Number(this);
};

// eslint-disable-next-line import/no-mutable-exports
export let prisma: PrismaClient;

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
}
