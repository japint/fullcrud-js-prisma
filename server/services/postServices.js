import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const postServices = {
  async getAll() {
    return prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id) {
    return prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });
  },

  async create(data) {
    return prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published || false,
        authorId: parseInt(data.authorId),
      },
      include: { author: true },
    });
  },

  async update(id, data) {
    return prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
      },
      include: { author: true },
    });
  },

  async delete(id) {
    return prisma.post.delete({
      where: { id: parseInt(id) },
    });
  },
};
