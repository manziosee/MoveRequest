import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find({
      select: ['id', 'email', 'name', 'role', 'department', 'isActive', 'createdAt'],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ 
      where: { id },
      select: ['id', 'email', 'name', 'role', 'department', 'isActive', 'createdAt'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(id: string, updateData: Partial<User>) {
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }

  async updateRole(id: string, role: string) {
    await this.userRepository.update(id, { role });
    return this.findOne(id);
  }

  async toggleActive(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.update(id, { isActive: !user.isActive });
    return this.findOne(id);
  }

  async changePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(id, { password: hashedPassword });
    return { message: 'Password updated successfully' };
  }

  async getStats() {
    const total = await this.userRepository.count();
    const active = await this.userRepository.count({ where: { isActive: true } });
    const byRole = await this.userRepository
      .createQueryBuilder('user')
      .select('user.role', 'role')
      .addSelect('COUNT(*)', 'count')
      .groupBy('user.role')
      .getRawMany();

    return { total, active, byRole };
  }

  async getActivityHistory(userId: string) {
    // Mock activity data - in real app would come from audit logs
    return [
      { action: 'Logged in', time: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'login' },
      { action: 'Profile viewed', time: new Date(Date.now() - 24 * 60 * 60 * 1000), type: 'view' },
      { action: 'Password changed', time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), type: 'security' },
    ];
  }
}