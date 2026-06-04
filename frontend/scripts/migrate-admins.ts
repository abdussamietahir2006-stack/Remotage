import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

const migrateAdmins = async () => {
  try {
    const mongoose = (await import('mongoose')).default;
    const { Admin } = await import('../lib/models/Admin.model');
    const { env } = await import('../lib/env-config');

    await mongoose.connect(env.MONGODB_URI, { dbName: 'remotage' } as any);
    console.log('✅ Connected to MongoDB');

    // Delete existing admins (optional)
    await Admin.deleteMany({});

    // Create admin users
    const admins = [
      {
        email: 'mashood.tahir@remotage.com',
        password: 'Remotage@2024',
        role: 'admin',
      },
      {
        email: 'rmast2006@gmail.com',
        password: 'remotage2024',
        role: 'admin',
      },
    ];

    for (const adminData of admins) {
      const existing = await Admin.findOne({ email: adminData.email });
      if (!existing) {
        const admin = new Admin(adminData);
        await admin.save();
        console.log(`✅ Created admin: ${adminData.email}`);
      } else {
        console.log(`⚠️  Admin already exists: ${adminData.email}`);
      }
    }

    console.log('✅ Migration complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateAdmins();
