import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true, role: true, department: true, isActive: true, createdAt: true },
    });
  }

  async createUser(userData: any) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: userData.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password || 'password', 10);
    return this.prisma.user.create({
      data: {
        email: userData.email,
        firstName: userData.firstName || userData.name?.split(' ')[0] || 'User',
        lastName: userData.lastName || userData.name?.split(' ')[1] || '',
        password: hashedPassword,
        role: userData.role || 'employee',
        department: userData.department,
        isActive: true,
      },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, department: true, isActive: true, createdAt: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, department: true, isActive: true, createdAt: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(id: number, updateData: any) {
    const { firstName, lastName, department } = updateData;
    const safeData: any = {};
    if (firstName !== undefined) safeData.firstName = firstName;
    if (lastName !== undefined) safeData.lastName = lastName;
    if (department !== undefined) safeData.department = department;
    await this.prisma.user.update({ where: { id }, data: safeData });
    return this.findOne(id);
  }

  async updateRole(id: number, role: string) {
    await this.prisma.user.update({ where: { id }, data: { role } });
    return this.findOne(id);
  }

  async toggleActive(id: number) {
    const user = await this.findOne(id);
    await this.prisma.user.update({ where: { id }, data: { isActive: !user.isActive } });
    return this.findOne(id);
  }

  async changePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword, passwordChangedAt: new Date() },
    });
    return { message: 'Password updated successfully' };
  }

  async getStats() {
    const total = await this.prisma.user.count();
    const active = await this.prisma.user.count({ where: { isActive: true } });
    const byRole = await this.prisma.user.groupBy({
      by: ['role'],
      _count: true,
    });
    return { total, active, byRole };
  }

  async getActivityHistory(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { lastLogin: true, passwordChangedAt: true, createdAt: true, updatedAt: true },
    });
    if (!user) return [];

    const activities: { action: string; timestamp: string | null; type: string }[] = [];

    activities.push({
      action: 'Logged in',
      timestamp: user.lastLogin ? user.lastLogin.toISOString() : null,
      type: 'login',
    });

    activities.push({
      action: 'Password changed',
      timestamp: user.passwordChangedAt ? user.passwordChangedAt.toISOString() : null,
      type: 'security',
    });

    activities.push({
      action: 'Account created',
      timestamp: user.createdAt.toISOString(),
      type: 'account',
    });

    return activities;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}