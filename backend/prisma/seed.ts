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
  await prisma.file.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.approval.deleteMany();
  await prisma.requestItem.deleteMany();
  await prisma.movementRequest.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.department.deleteMany();

  // Create users
  const hashedPassword = await bcrypt.hash('password', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@company.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      department: 'Management',
    },
  });

  const procurement = await prisma.user.create({
    data: {
      email: 'procurement@company.com',
      password: hashedPassword,
      firstName: 'Procurement',
      lastName: 'Officer',
      role: 'procurement',
      department: 'Procurement',
    },
  });

  const employee = await prisma.user.create({
    data: {
      email: 'employee@company.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'employee',
      department: 'IT',
    },
  });

  console.log('✅ Users created');

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
