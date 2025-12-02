import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll() {
  return prisma.product.findMany({
    include: { category: true },
  });
}

export async function getById(id) {
  return prisma.product.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });
}

export async function create(data) {
  return prisma.product.create({ data });
}

export async function update(id, data) {
  return prisma.product.update({
    where: { id: Number(id) },
    data,
  });
}

export async function remove(id) {
  return prisma.product.delete({
    where: { id: Number(id) },
  });
}
