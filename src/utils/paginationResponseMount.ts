export interface IPaginationResponseMountParams<T> {
  data: T[];
  page: number;
  limit: number;
  totalItems: number;
}

export interface IPaginationResponse<T> {
  dataList: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export const paginationResponseMount = <T>({
  data,
  page,
  limit,
  totalItems,
}: IPaginationResponseMountParams<T>): IPaginationResponse<T> => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    dataList: data,
    totalPages,
    currentPage: page,
    totalItems,
  };
};
