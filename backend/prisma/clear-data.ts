import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function clearData() {
  console.log('🗑️  Clearing all data except users...\n');

  try {
    // Delete in order of dependencies (child tables first)
    console.log('Deleting files...');
    await prisma.file.deleteMany();
    console.log('✅ Files deleted');

    console.log('Deleting notifications...');
    await prisma.notification.deleteMany();
    console.log('✅ Notifications deleted');

    console.log('Deleting approvals...');
    await prisma.approval.deleteMany();
    console.log('✅ Approvals deleted');

    console.log('Deleting request items...');
    await prisma.requestItem.deleteMany();
    console.log('✅ Request items deleted');

    console.log('Deleting movement requests...');
    await prisma.movementRequest.deleteMany();
    console.log('✅ Movement requests deleted');

    console.log('Deleting categories...');
    await prisma.category.deleteMany();
    console.log('✅ Categories deleted');

    console.log('Deleting departments...');
    await prisma.department.deleteMany();
    console.log('✅ Departments deleted');

    // Reset sequences (except users)
    console.log('\n🔄 Resetting sequences...');
    await prisma.$executeRaw`ALTER SEQUENCE movement_requests_id_seq RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE request_items_id_seq RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE approvals_id_seq RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE notifications_id_seq RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE categories_id_seq RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE departments_id_seq RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE files_id_seq RESTART WITH 1`;
    console.log('✅ Sequences reset');

    // Count remaining users
    const userCount = await prisma.user.count();
    console.log(`\n✅ Data cleared successfully!`);
    console.log(`📊 Remaining users: ${userCount}`);
    
    // Show user list
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
    
    console.log('\n👥 Users in database:');
    users.forEach(user => {
      console.log(`   ${user.id}. ${user.firstName} ${user.lastName} (${user.email}) - ${user.role}`);
    });

  } catch (error) {
    console.error('❌ Error clearing data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

clearData();
