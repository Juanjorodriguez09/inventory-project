import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll() {
  return prisma.category.findMany();
}

export async function create(data) {
  return prisma.category.create({ data });
}

export async function update(id, data) {
  return prisma.category.update({
    where: { id: Number(id) },
    data,
  });
}

export async function remove(id) {
  return prisma.category.delete({
    where: { id: Number(id) },
  });
}
