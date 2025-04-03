type customResponse = {
  data: string;
  headers: {
    headers: {
      "Content-Type": string;
    };
  };
};

export function formatResponse(data: any): customResponse {
  return {
    data: JSON.stringify({
      status: 200,
      data: data,
    }),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}
