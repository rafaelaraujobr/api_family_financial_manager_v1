import { PrismaClient } from '@prisma/client';
import * as categories from './data/categories.json';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  await prisma.userRealm.deleteMany();
  await prisma.preference.deleteMany();
  await prisma.realm.deleteMany();
  await prisma.user.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.target.deleteMany();
  await prisma.wallet.deleteMany();
  console.log('database cleaned');
  console.log('Seeding categories');
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
  console.log('Seeding categories completed');
  console.log('Seeding account');
  await prisma.$transaction(async (tx) => {
    const realm = await tx.realm.create({ data: { name: 'default' } });
    const password = await hash('Mudar@123', 10);
    const user = await tx.user.create({
      data: {
        first_name: 'Rafael',
        last_name: 'Araujo',
        email: 'rflaraujodev@gmail.com',
        password,
        preference: {
          create: {
            realm_id: realm.id,
          },
        },
        realm: {
          create: {
            realm_id: realm.id,
          },
        },
        wallets: {
          create: {
            realm_id: realm.id,
            name: 'default',
            type: 'OTHER',
          },
        },
      },
    });
    return { realm, user };
  });
  console.log('Seeding account completed');
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
