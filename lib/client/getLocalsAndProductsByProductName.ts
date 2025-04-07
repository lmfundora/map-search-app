import axios from "axios";
import { useHeaders } from "../hooks/useHeders";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getLocalsAndProductsByProductName(name: string) {
  const url = `${apiUrl}/products-locals`;
  const response = await axios.get(url, useHeaders({ name: name }));

  return response.data;
}
