import { prisma } from "@/lib/prisma_client";
import { formatResponse } from "../formatResponse";

export async function GET(request: Request) {
  const locales = await prisma.locales.findMany();

  const { data, headers } = formatResponse(locales);

  return new Response(data, headers);
}
