import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  // Create some sample members
  const member1 = await prisma.user.upsert({
    where: { email: 'member1@example.com' },
    update: {},
    create: {
      email: 'member1@example.com',
      name: 'John Doe',
      role: 'MEMBER',
      company: 'Acme Inc',
      title: 'CEO',
      phone: '555-123-4567',
    },
  })

  const member2 = await prisma.user.upsert({
    where: { email: 'member2@example.com' },
    update: {},
    create: {
      email: 'member2@example.com',
      name: 'Jane Smith',
      role: 'MEMBER',
      company: 'XYZ Corp',
      title: 'Marketing Director',
      phone: '555-987-6543',
    },
  })

  // Create a sample referral
  const referral = await prisma.referral.create({
    data: {
      giverId: member1.id,
      receiverId: member2.id,
      contactName: 'Bob Johnson',
      contactEmail: 'bob@example.com',
      contactPhone: '555-555-5555',
      notes: 'Interested in marketing services',
      status: 'NEW',
    },
  })

  // Create a sample blog post
  const post = await prisma.post.create({
    data: {
      title: 'Welcome to Elite Business Connections',
      slug: 'welcome-to-ebc',
      content: 'This is a sample blog post for Elite Business Connections.',
      excerpt: 'Welcome to our new website!',
      published: true,
    },
  })

  console.log({ admin, member1, member2, referral, post })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
