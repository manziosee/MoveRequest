# Seeding Production Database

## Current User Credentials

After seeding, these users will be available:

| Role | Email | Password | Name |
|------|-------|----------|------|
| Admin | manziosee3@gmail.com | 123456 | Manzi Osee |
| Procurement | manziosee2001@gmail.com | 123456 | Irakoze Keza |
| Employee | oseemanzi3@gmail.com | 123456 | Simbi Marie |

## How to Seed Production Database

### Option 1: Via Render Dashboard (Recommended)

1. Go to your Render dashboard: https://dashboard.render.com
2. Select your backend service
3. Go to "Shell" tab
4. Run the following command:
   ```bash
   npm run seed
   ```

### Option 2: Via Local Connection

If you have the production DATABASE_URL:

```bash
cd backend
DATABASE_URL="your-production-database-url" npm run seed
```

### Option 3: Manual SQL (If seed script fails)

Connect to your PostgreSQL database and run:

```sql
-- Clear existing data
TRUNCATE users, movement_requests, request_items, approvals, notifications, categories, departments, files CASCADE;

-- Reset sequences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE movement_requests_id_seq RESTART WITH 1;
ALTER SEQUENCE request_items_id_seq RESTART WITH 1;
ALTER SEQUENCE approvals_id_seq RESTART WITH 1;
ALTER SEQUENCE notifications_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE departments_id_seq RESTART WITH 1;
ALTER SEQUENCE files_id_seq RESTART WITH 1;

-- Insert users (password is bcrypt hash of "123456")
INSERT INTO users (email, password, "firstName", "lastName", role, department, "isActive", "createdAt", "updatedAt")
VALUES 
  ('manziosee3@gmail.com', '$2a$10$YourBcryptHashHere', 'Manzi', 'Osee', 'admin', 'Management', true, NOW(), NOW()),
  ('manziosee2001@gmail.com', '$2a$10$YourBcryptHashHere', 'Irakoze', 'Keza', 'procurement', 'Procurement', true, NOW(), NOW()),
  ('oseemanzi3@gmail.com', '$2a$10$YourBcryptHashHere', 'Simbi', 'Marie', 'employee', 'IT', true, NOW(), NOW());
```

## Verification

After seeding, test login:

```bash
curl -X POST https://moverequest.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"manziosee3@gmail.com","password":"123456"}'
```

Expected response:
```json
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "manziosee3@gmail.com",
    "firstName": "Manzi",
    "lastName": "Osee",
    "role": "admin"
  }
}
```

## Troubleshooting

### "Invalid credentials" error

This means the database hasn't been seeded yet or the password hash doesn't match.

**Solution**: Run the seed script on the production database.

### Can't access Render Shell

**Solution**: 
1. Go to Render dashboard
2. Your service → Settings
3. Add a "Run Command" build hook: `npm run seed`
4. Or manually trigger a deploy which will run migrations

### Database connection issues

**Solution**: Verify DATABASE_URL in Render environment variables matches your Prisma connection string.

## Current Status

✅ Backend deployed: https://moverequest.onrender.com
✅ API working: https://moverequest.onrender.com/api
✅ Health check: https://moverequest.onrender.com/health
⚠️  Database needs seeding with new users

## Next Steps

1. Seed the production database using one of the methods above
2. Test login with the new credentials
3. Verify all three user roles work correctly
