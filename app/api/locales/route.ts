import { prisma } from "@/lib/prisma_client";
import { formatResponse } from "../formatResponse";
import { idToString } from "../idToString";

export async function GET(request: Request) {
  try {
    const locales = await prisma.locales.findMany();

    const { data, headers } = formatResponse(idToString(locales));

    return new Response(data, headers);
  } catch (error) {
    console.error("Error al obtener locales y productos:", error);
    const { data, headers } = formatResponse([]);

    return new Response(data, { ...headers, status: 500 });
  }
}
