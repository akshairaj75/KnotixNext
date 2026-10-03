import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Knotix database...');

  const now = new Date();

  // Create default admin user if not existing
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@knotix.com' },
    update: {},
    create: {
      fullName: 'Knotix Administrator',
      email: process.env.ADMIN_EMAIL || 'admin@knotix.com',
      phone: '+919744802218',
      passwordHash: process.env.ADMIN_PASSWORD || 'KnotixAdmin2026!',
      role: 'ADMIN',
      active: true,
      createdAt: now,
      updatedAt: now,
    },
  });
  console.log('Admin user verified:', adminUser.email);

  // Default Categories
  const categoriesData = [
    { name: 'Rings', slug: 'rings', description: 'Bold and fearless handcrafted luxury rings.', sortOrder: 1 },
    { name: 'Necklaces', slug: 'necklaces', description: 'Carry your story. Wear your symbol.', sortOrder: 2 },
    { name: 'Bracelets', slug: 'bracelets', description: 'Stronger together. Timeless links of style.', sortOrder: 3 },
    { name: 'Earrings', slug: 'earrings', description: 'Subtle or bold. Make your statement.', sortOrder: 4 },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        sortOrder: cat.sortOrder,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        sortOrder: cat.sortOrder,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    });
  }
  console.log('Default categories verified.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
