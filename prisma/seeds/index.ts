import { PrismaClient } from '@prisma/client';
import * as categories from './data/categories.json';
const prisma = new PrismaClient();
async function main() {
  await prisma.realm.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.target.deleteMany();
  for (const category of categories) {
    console.log(category);
    await prisma.category.create({
      data: category as any,
    });
  }
}

main()
  .then(async () => {
    console.log('Seeding completed');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
