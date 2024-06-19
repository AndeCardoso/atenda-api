export const convertStringToNumberArray = (value?: string) => {
  if (!value) return [];
  const valuesArray = value?.split(",");
  return valuesArray?.map((value) => Number(value));
};
