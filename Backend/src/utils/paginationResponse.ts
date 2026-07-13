export const paginationResponse = (
  data: any,
  total: number,
  page: number,
  limit: number
) => ({
  data,

  pagination: {
    total,

    page,

    limit,

    totalPages: Math.ceil(total / limit),

    hasNext:
      page < Math.ceil(total / limit),

    hasPrevious:
      page > 1,
  },
});