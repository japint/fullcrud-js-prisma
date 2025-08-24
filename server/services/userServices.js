import prisma from "../config/prisma.js";

export const userServices = {
  getAll: async () => {
    return prisma.user.findMany({
      include: { posts: true },
      orderBy: { createdAt: "desc" },
    });
  },

  getById: async (id) => {
    return prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { posts: true },
    });
  },

  create: async (data) => {
    const { name, email, age } = data;
    return prisma.user.create({
      data: {
        name,
        email,
        age,
      },
      include: { posts: true },
    });
  },

  update: async (id, data) => {
    const { name, email, age } = data;
    return prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        age: age ? parseInt(age) : null,
      },
      include: { posts: true },
    });
  },

  delete: async (id) => {
    return prisma.user.delete({
      where: { id: parseInt(id) },
      include: { posts: true },
    });
  },
};
