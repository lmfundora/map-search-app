import { prisma } from "@/lib/prisma_client";
import { formatResponse } from "../formatResponse";
import { idToString, formatProductLocalesResponse } from "../idToString";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "";
  try {
    const localesConProducto = await prisma.locales.findMany({
      where: {
        products_locals: {
          some: {
            productos: {
              name: {
                contains: name,
                mode: "insensitive",
              },
            },
            disponibility: true,
          },
        },
      },
    });

    const productosEncontrados = await prisma.products_locals.findMany({
      where: {
        disponibility: true,
        productos: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      },
      select: {
        local_id: true,
        price: true,
        stock: true,
        productos: {
          select: {
            name: true,
            description: true,
            brand: true,
            image: true,
          },
        },
      },
    });

    const d = {
      localesDisponibles: idToString(localesConProducto),
      productosEncontrados: formatProductLocalesResponse(productosEncontrados),
    };
    const { data, headers } = formatResponse(d);

    return new Response(data, headers);
  } catch (error) {
    console.error("Error al obtener locales y productos:", error);
    const { data, headers } = formatResponse({
      localesDisponibles: [],
      productosEncontrados: [],
    });

    return new Response(data, { ...headers, status: 500 });
  }
}
