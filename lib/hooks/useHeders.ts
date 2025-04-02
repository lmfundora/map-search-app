export const useHeaders = (params?: Record<string, any>) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    params: params,
  };

  return headers;
};
