import axios from "axios";
import { useHeaders } from "../hooks/useHeders";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getLocales() {
  const url = `${apiUrl}/locales`;
  const response = await axios.get(url, useHeaders());

  return response.data;
}
