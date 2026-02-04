import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from './users/entities/user.entity';
import { Category } from './admin/entities/category.entity';
import { Department } from './admin/entities/department.entity';
import * as bcrypt from 'bcryptjs';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepository = app.get(getRepositoryToken(User));
  const categoryRepository = app.get(getRepositoryToken(Category));
  const departmentRepository = app.get(getRepositoryToken(Department));

  // Create demo users
  const users = [
    {
      email: 'employee@company.com',
      name: 'John Employee',
      password: await bcrypt.hash('password', 10),
      role: 'employee',
      department: 'IT',
    },
    {
      email: 'procurement@company.com',
      name: 'Sarah Procurement',
      password: await bcrypt.hash('password', 10),
      role: 'procurement',
      department: 'Procurement',
    },
    {
      email: 'admin@company.com',
      name: 'Admin User',
      password: await bcrypt.hash('password', 10),
      role: 'admin',
      department: 'Administration',
    },
  ];

  for (const userData of users) {
    const existingUser = await userRepository.findOne({ where: { email: userData.email } });
    if (!existingUser) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
      console.log(`Created user: ${userData.email}`);
    }
  }

  // Create categories
  const categories = [
    { name: 'Electronics', description: 'Electronic devices and equipment', itemCount: 45 },
    { name: 'Furniture', description: 'Office furniture and fixtures', itemCount: 32 },
    { name: 'Stationery', description: 'Office supplies and stationery', itemCount: 78 },
    { name: 'Equipment', description: 'Tools and equipment', itemCount: 23 },
    { name: 'Supplies', description: 'General supplies', itemCount: 56 },
  ];

  for (const categoryData of categories) {
    const existing = await categoryRepository.findOne({ where: { name: categoryData.name } });
    if (!existing) {
      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);
      console.log(`Created category: ${categoryData.name}`);
    }
  }

  // Create departments
  const departments = [
    { name: 'Information Technology', code: 'IT', manager: 'John Doe', userCount: 32, requestCount: 145 },
    { name: 'Human Resources', code: 'HR', manager: 'Jane Smith', userCount: 28, requestCount: 98 },
    { name: 'Finance', code: 'FIN', manager: 'Mike Johnson', userCount: 25, requestCount: 112 },
    { name: 'Operations', code: 'OPS', manager: 'Sarah Williams', userCount: 45, requestCount: 167 },
    { name: 'Marketing', code: 'MKT', manager: 'David Brown', userCount: 18, requestCount: 76 },
    { name: 'Procurement', code: 'PROC', manager: 'Sarah Procurement', userCount: 6, requestCount: 15 },
  ];

  for (const deptData of departments) {
    const existing = await departmentRepository.findOne({ where: { code: deptData.code } });
    if (!existing) {
      const department = departmentRepository.create(deptData);
      await departmentRepository.save(department);
      console.log(`Created department: ${deptData.name}`);
    }
  }

  console.log('Seeding completed!');
  await app.close();
}

seed().catch(console.error);