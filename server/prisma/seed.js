import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create users with posts
  const user1 = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
      age: 28,
      posts: {
        create: [
          {
            title: "Getting Started with Prisma",
            content: "Prisma is a powerful database toolkit...",
            published: true,
          },
          {
            title: "Advanced Prisma Techniques",
            content: "Let's explore some advanced features...",
            published: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob Smith",
      email: "bob@example.com",
      age: 32,
      posts: {
        create: [
          {
            title: "PostgreSQL Best Practices",
            content: "Here are some tips for using PostgreSQL...",
            published: true,
          },
        ],
      },
    },
  });

  console.log("Seed data created successfully!");
  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
