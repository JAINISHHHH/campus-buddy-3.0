import { Prisma } from "@prisma/client";

export interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const buildQuery = (
  query: QueryOptions,
  searchableFields: string[]
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;
  const take = limit;

  const where: Prisma.ComplaintWhereInput = {};

  if (query.search && searchableFields.length) {
    where.OR = searchableFields.map((field) => ({
      [field]: {
        contains: query.search,
        mode: Prisma.QueryMode.insensitive,
      },
    })) as Prisma.ComplaintWhereInput["OR"];
  }

  const orderBy: Prisma.ComplaintOrderByWithRelationInput =
    query.sortBy
      ? ({
          [query.sortBy]:
            query.order === "desc" ? "desc" : "asc",
        } as Prisma.ComplaintOrderByWithRelationInput)
      : {
          createdAt: "desc",
        };

  return {
    skip,
    take,
    where,
    orderBy,
    page,
    limit,
  };
};