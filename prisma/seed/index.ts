import { PrismaClient } from '@prisma/client';
import * as categories from './data/categories.json';
import * as permissions from './data/permissions.json';
import * as roles from './data/roles.json';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();
const roleSuperAdmin = '5ca9bccc-bcdb-41f3-9599-e65a0a082e83';

async function main() {
  console.log('Cleaning database...');
  await prisma.groupOnPermission.deleteMany();
  await prisma.roleOnPermission.deleteMany();
  await prisma.userOnTenant.deleteMany();
  await prisma.userOnGroup.deleteMany();
  await prisma.userOnPermission.deleteMany();
  await prisma.group.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.preference.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.user.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.target.deleteMany();
  await prisma.wallet.deleteMany();
  console.log('Database cleaned');
  console.log('Seeding roles');
  await prisma.role.createMany({
    data: roles,
  });
  console.log('Roles created...');
  console.log('Seeding permissions');
  await prisma.permission.createMany({
    data: permissions,
  });
  console.log('Permissions created...');
  console.log('Seeding RoleOnPermission');
  const permissionsAll = await prisma.permission.findMany();
  await prisma.roleOnPermission.createMany({
    data: permissionsAll
      .filter((item) => item.entity !== 'developer' && item.entity !== 'customer')
      .map((permission) => ({
        role_id: roleSuperAdmin,
        permission_id: permission.id,
      })),
  });
  console.log('RoleOnPermission created...');
  console.log('Seeding categories');
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
  console.log('Seeding categories completed');
  console.log('Seeding account');
  const { tenant, user } = await prisma.$transaction(async (tx) => {
    const tenant = await tx.tenant.create({ data: { name: 'default' } });
    const password = await hash('Mudar@123', 10);
    const user = await tx.user.create({
      data: {
        first_name: 'Rafael',
        last_name: 'Araujo',
        email: 'rflaraujodev@gmail.com',
        password,
        preference: {
          create: {
            tenant_id: tenant.id,
          },
        },
        tenants: {
          create: {
            tenant_id: tenant.id,
            role_id: roleSuperAdmin,
          },
        },
      },
    });
    return { tenant, user };
  });
  console.log('Seeding account completed');
  console.log('Seeding user permissions');
  await prisma.userOnPermission.createMany({
    data: permissionsAll
      .filter((item) => item.entity === 'customer')
      .map((permission) => ({
        user_id: user.id,
        permission_id: permission.id,
      })),
  });
  console.log('User permissions created...');
  console.log('Seeding group');
  const group = await prisma.group.create({
    data: {
      name: 'Developers',
      description: 'Developers group',
      tenant_id: tenant.id,
    },
  });
  await prisma.groupOnPermission.createMany({
    data: permissionsAll
      .filter((item) => item.entity === 'developer')
      .map((permission) => ({
        group_id: group.id,
        permission_id: permission.id,
      })),
  });
  await prisma.userOnGroup.create({
    data: {
      user_id: user.id,
      group_id: group.id,
    },
  });
  console.log('Group created...');
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
