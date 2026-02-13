import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.file.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.approval.deleteMany();
  await prisma.requestItem.deleteMany();
  await prisma.movementRequest.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.department.deleteMany();
  console.log('✅ Existing data cleared');

  // Reset auto-increment sequences
  await prisma.$executeRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE categories_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE departments_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE movement_requests_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE request_items_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE approvals_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE notifications_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE files_id_seq RESTART WITH 1`;
  console.log('✅ Sequences reset');

  // Create users with new credentials
  const hashedPassword = await bcrypt.hash('123456', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'manziosee3@gmail.com',
      password: hashedPassword,
      firstName: 'Manzi',
      lastName: 'Osee',
      role: 'admin',
      department: 'Management',
    },
  });

  const procurement = await prisma.user.create({
    data: {
      email: 'manziosee2001@gmail.com',
      password: hashedPassword,
      firstName: 'Irakoze',
      lastName: 'Keza',
      role: 'procurement',
      department: 'Procurement',
    },
  });

  const employee = await prisma.user.create({
    data: {
      email: 'oseemanzi3@gmail.com',
      password: hashedPassword,
      firstName: 'Simbi',
      lastName: 'Marie',
      role: 'employee',
      department: 'IT',
    },
  });

  console.log('✅ Users created:');
  console.log('   - Admin: manziosee3@gmail.com / 123456');
  console.log('   - Procurement: manziosee2001@gmail.com / 123456');
  console.log('   - Employee: oseemanzi3@gmail.com / 123456');

  // Create categories
  await prisma.category.createMany({
    data: [
      { name: 'Office Supplies', description: 'General office supplies and stationery' },
      { name: 'IT Equipment', description: 'Computers, laptops, and IT hardware' },
      { name: 'Furniture', description: 'Office furniture and fixtures' },
      { name: 'Travel', description: 'Travel and accommodation expenses' },
    ],
  });

  console.log('✅ Categories created');

  // Create departments
  await prisma.department.createMany({
    data: [
      { name: 'IT', description: 'Information Technology', budget: 1000000 },
      { name: 'HR', description: 'Human Resources', budget: 500000 },
      { name: 'Finance', description: 'Finance Department', budget: 750000 },
      { name: 'Procurement', description: 'Procurement Department', budget: 2000000 },
    ],
  });

  console.log('✅ Departments created');

  // Create sample requests
  const request1 = await prisma.movementRequest.create({
    data: {
      title: 'Office Laptop Request',
      description: 'Need new laptops for IT team',
      category: 'IT Equipment',
      priority: 'high',
      status: 'pending',
      department: 'IT',
      totalAmount: 100000,
      userId: employee.id,
      items: {
        create: [
          {
            name: 'Dell XPS 15',
            quantity: 2,
            unitPrice: 50000,
            totalPrice: 100000,
            specifications: 'i7, 16GB RAM, 512GB SSD',
          },
        ],
      },
    },
  });

  const request2 = await prisma.movementRequest.create({
    data: {
      title: 'Office Supplies',
      description: 'Monthly office supplies',
      category: 'Office Supplies',
      priority: 'medium',
      status: 'approved',
      department: 'HR',
      totalAmount: 15000,
      userId: employee.id,
      items: {
        create: [
          {
            name: 'Printer Paper',
            quantity: 10,
            unitPrice: 500,
            totalPrice: 5000,
            specifications: 'A4 size, 500 sheets per ream',
          },
          {
            name: 'Pens',
            quantity: 50,
            unitPrice: 200,
            totalPrice: 10000,
            specifications: 'Blue and black ink',
          },
        ],
      },
    },
  });

  console.log('✅ Requests created');

  // Create approvals
  await prisma.approval.create({
    data: {
      status: 'pending',
      comments: 'Under review',
      requestId: request1.id,
      approverId: procurement.id,
    },
  });

  await prisma.approval.create({
    data: {
      status: 'approved',
      comments: 'Approved for procurement',
      requestId: request2.id,
      approverId: procurement.id,
    },
  });

  console.log('✅ Approvals created');

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        title: 'Request Submitted',
        message: 'Your request has been submitted successfully',
        type: 'success',
        userId: employee.id,
      },
      {
        title: 'New Request',
        message: 'New request pending your approval',
        type: 'info',
        userId: procurement.id,
      },
    ],
  });

  console.log('✅ Notifications created');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
