import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userServices = {
  async getAll() {
    return prisma.user.findMany({
      include: { posts: true },
      orderBy: { createdAt: "desc" },
    });
  },
  async getById(id) {
    return prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { posts: true },
    });
  },

  async create(data) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        age: data.age ? parseInt(data.age) : null,
      },
      include: { posts: true },
    });
  },

  async update(id, data) {
    return prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        email: data.email,
        age: data.age ? parseInt(data.age) : null,
      },
      include: { posts: true },
    });
  },

  async delete(id) {
    return prisma.user.delete({
      where: { id: parseInt(id) },
      include: { posts: true },
    });
  },
};
