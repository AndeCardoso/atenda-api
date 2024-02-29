interface IPaginantionResponseMountParams<T> {
  data: T[];
  page: number;
  limit: number;
  totalItems: number;
}

export const paginantionResponseMount = <T>({
  data,
  page,
  limit,
  totalItems,
}: IPaginantionResponseMountParams<T>) => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    data,
    totalPages,
    currentPage: page,
    totalItems,
  };
};
