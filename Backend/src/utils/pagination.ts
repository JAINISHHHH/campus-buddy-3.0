export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export const getPagination = (
  page = 1,
  limit = 10
) => {
  const take = Math.max(Number(limit), 1);

  const skip =
    (Math.max(Number(page), 1) - 1) * take;

  return {
    skip,
    take,
    page: Number(page),
    limit: Number(limit),
  };
};