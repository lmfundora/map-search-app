import { prisma } from "@/lib/prisma_client";

export async function GET(request: Request) {
  const locales = await prisma.locales.findMany();

  return new Response(
    JSON.stringify({
      status: 200,
      data: locales,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
