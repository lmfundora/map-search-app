import { prisma } from "@/lib/prisma_client";
import { formatResponse } from "../formatResponse";

export async function GET(request: Request) {
  const { data, headers } = formatResponse({
    mensaje: "Unimplemented",
  });

  return new Response(data, { ...headers, status: 400 });
}
